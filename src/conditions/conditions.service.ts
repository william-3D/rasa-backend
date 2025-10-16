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
}
