import { Module } from '@nestjs/common';
import { AllergiesController } from './allergies.controller';
import { AllergiesService } from './allergies.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AllergiesController],
  providers: [AllergiesService, PrismaService],
})
export class AllergiesModule {}
