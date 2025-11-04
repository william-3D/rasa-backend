import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConditionsService {
  constructor(private prisma: PrismaService) {}

  async getAllConditions() {
    return this.prisma.condition.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async createCondition(name: string) {
    return this.prisma.condition.create({
      data: { name },
    });
  }

  async updateCondition(id: string, name: string) {
    return this.prisma.condition.update({
      where: { id },
      data: { name },
    });
  }

  async deleteCondition(id: string) {
    return this.prisma.condition.delete({
      where: { id },
    });
  }
}
