import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';

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

  async createCondition(dto: CreateConditionDto) {
    return this.prisma.condition.create({
      data: dto,
    });
  }

  async updateCondition(id: string, dto: UpdateConditionDto) {
    return this.prisma.condition.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCondition(id: string) {
    return this.prisma.condition.delete({
      where: { id },
    });
  }
}
