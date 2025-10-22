import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getFilters() {
    const [regions, conditions, allergies] = await Promise.all([
      this.prisma.recipe.findMany({
        select: { region: true },
        distinct: 'region',
      }),
      this.prisma.condition.findMany({ select: { name: true } }),
      this.prisma.allergy.findMany({ select: { name: true } }),
    ]);

    return {
      regions: regions
        .map((r) => r.region)
        .filter(Boolean)
        .sort(),
      conditions: conditions.map((c) => c.name).sort(),
      allergies: allergies.map((a) => a.name).sort(),
    };
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        conditions: { include: { condition: true } },
        allergies: { include: { allergy: true } },
      },
    });

    if (!user) return null;

    return {
      region: user.region,
      conditions: user.conditions.map((c) => c.condition.name),
      allergies: user.allergies.map((a) => a.allergy.name),
    };
  }

  async findAll(
    search?: string,
    userId?: string,
    page = 1,
    limit = 12,
    regions?: string[],
    conditions?: string[],
    allergies?: string[],
    useUserFilters = false,
  ) {
    const where: Prisma.RecipeWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (useUserFilters && userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          conditions: { include: { condition: true } },
          allergies: true,
        },
      });

      if (user) {
        if (user.region) {
          where.region = user.region;
        }
        if (user.conditions.length) {
          where.conditions = {
            some: {
              condition: {
                name: { in: user.conditions.map((c) => c.condition.name) },
              },
            },
          };
        }
        const userAllergyIds = user.allergies.map((a) => a.allergyId);
        if (userAllergyIds.length) {
          where.allergies = { none: { allergyId: { in: userAllergyIds } } };
        }
      }
    } else {
      if (regions?.length) {
        where.region = { in: regions };
      }
      if (conditions?.length) {
        where.conditions = {
          some: { condition: { name: { in: conditions } } },
        };
      }
      if (allergies?.length) {
        where.allergies = { some: { allergy: { name: { in: allergies } } } };
      }
    }

    const skip = (page - 1) * limit;
    const [recipes, total] = await Promise.all([
      this.prisma.recipe.findMany({ where, skip, take: limit }),
      this.prisma.recipe.count({ where }),
    ]);

    return {
      recipes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
