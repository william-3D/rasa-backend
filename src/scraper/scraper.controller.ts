import { Controller, Post, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScrapeRecipesDto } from './dto/scrape-recipes.dto';

@Controller('scraper')
export class ScraperController {
  constructor(private scraperService: ScraperService) {}

  @Post('recipes')
  scrapeRecipes(@Query() dto: ScrapeRecipesDto) {
    return this.scraperService.scrapeRecipes(dto);
  }
}
