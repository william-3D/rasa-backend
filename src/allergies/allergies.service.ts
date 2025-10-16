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
}