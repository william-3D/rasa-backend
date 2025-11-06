import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AllergiesService } from './allergies.service';

@Controller('allergies')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Get()
  getAllAllergies() {
    return this.allergiesService.getAllAllergies();
  }

  @Post()
  createAllergy(@Body('name') name: string) {
    return this.allergiesService.createAllergy(name);
  }

  @Patch(':id')
  updateAllergy(@Param('id') id: string, @Body('name') name: string) {
    return this.allergiesService.updateAllergy(id, name);
  }

  @Delete(':id')
  deleteAllergy(@Param('id') id: string) {
    return this.allergiesService.deleteAllergy(id);
  }
}
