import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { FindAllRecipesDto } from './dto/find-all-recipes.dto';

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
  findAll(@Query() dto: FindAllRecipesDto) {
    return this.recipesService.findAll(
      dto.search,
      dto.userId,
      dto.page,
      dto.limit,
      dto.region,
      dto.condition,
      dto.allergy,
      dto.useUserFilters,
    );
  }
}
