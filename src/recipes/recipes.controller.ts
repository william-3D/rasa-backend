import { Controller, Get, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('userId') userId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.recipesService.findAll(
      search,
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 12,
    );
  }
}
