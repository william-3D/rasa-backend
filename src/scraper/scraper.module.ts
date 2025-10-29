import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ScraperService, PrismaService],
  controllers: [ScraperController]
})
export class ScraperModule {}
