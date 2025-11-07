import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { FindAllRecipesDto } from './dto/find-all-recipes.dto';

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

  // Apply filters based on user's profile (region, conditions, and exclude allergens)
  private async applyUserFilters(
    where: Prisma.RecipeWhereInput,
    userId: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        conditions: { include: { condition: true } },
        allergies: true,
      },
    });

    if (!user) return;

    if (user.region) where.region = user.region;

    // Show recipes suitable for user's health conditions
    if (user.conditions.length) {
      where.conditions = {
        some: {
          condition: {
            name: { in: user.conditions.map((c) => c.condition.name) },
          },
        },
      };
    }

    // Exclude recipes containing user's allergens for safety
    const userAllergyIds = user.allergies.map((a) => a.allergyId);
    if (userAllergyIds.length) {
      where.allergies = { none: { allergyId: { in: userAllergyIds } } };
    }
  }

  async findAll(dto: FindAllRecipesDto) {
    const { search, userId, useUserFilters, regions, conditions, allergies } =
      dto;
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 12;
    const where: Prisma.RecipeWhereInput = {};

    if (search) {
      // Case-insensitive search in title or description
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Use user profile filters or manual filters
    if (useUserFilters && userId) {
      await this.applyUserFilters(where, userId);
    } else {
      if (regions?.length) where.region = { in: regions };
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

    return { recipes, total, page, totalPages: Math.ceil(total / limit) };
  }
}
