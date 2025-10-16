import { Module } from '@nestjs/common';
import { ConditionsController } from './conditions.controller';
import { ConditionsService } from './conditions.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ConditionsController],
  providers: [ConditionsService, PrismaService],
})
export class ConditionsModule {}
