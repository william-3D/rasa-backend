import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

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

  async createAllergy(dto: CreateAllergyDto) {
    return this.prisma.allergy.create({
      data: dto,
    });
  }

  async updateAllergy(id: string, dto: UpdateAllergyDto) {
    return this.prisma.allergy.update({
      where: { id },
      data: dto,
    });
  }

  async deleteAllergy(id: string) {
    return this.prisma.allergy.delete({
      where: { id },
    });
  }
}
