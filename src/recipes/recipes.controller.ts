import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('filters')
  getFilters() {
    return this.recipesService.getFilters();
  }

  @Get('user/:userId')
  getUserProfile(@Param('userId') userId: string) {
    return this.recipesService.getUserProfile(userId);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('userId') userId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('region') region?: string | string[],
    @Query('condition') condition?: string | string[],
    @Query('allergy') allergy?: string | string[],
    @Query('useUserFilters') useUserFilters?: string,
  ) {
    return this.recipesService.findAll(
      search,
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 12,
      Array.isArray(region) ? region : region ? [region] : undefined,
      Array.isArray(condition)
        ? condition
        : condition
          ? [condition]
          : undefined,
      Array.isArray(allergy) ? allergy : allergy ? [allergy] : undefined,
      useUserFilters === 'true',
    );
  }
}
