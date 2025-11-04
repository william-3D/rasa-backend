import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AllergiesService {
  constructor(private prisma: PrismaService) {}

  async getAllAllergies() {
    return this.prisma.allergy.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async createAllergy(name: string) {
    return this.prisma.allergy.create({
      data: { name },
    });
  }

  async updateAllergy(id: string, name: string) {
    return this.prisma.allergy.update({
      where: { id },
      data: { name },
    });
  }

  async deleteAllergy(id: string) {
    return this.prisma.allergy.delete({
      where: { id },
    });
  }
}
