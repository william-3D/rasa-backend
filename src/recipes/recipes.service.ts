import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, userId?: string, page = 1, limit = 12) {
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          conditions: { include: { condition: true } },
          allergies: { include: { allergy: true } },
        },
      });

      if (user) {
        const userAllergyIds = user.allergies.map((a) => a.allergyId);
        where.allergies = { none: { allergyId: { in: userAllergyIds } } };
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
