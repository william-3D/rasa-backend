import { Controller, Post, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private scraperService: ScraperService) {}

  @Post('recipes')
  scrapeRecipes(@Query('query') query?: string) {
    return this.scraperService.scrapeRecipes(query);
  }
}
