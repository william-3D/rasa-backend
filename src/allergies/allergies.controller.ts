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
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

@Controller('allergies')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Get()
  getAllAllergies() {
    return this.allergiesService.getAllAllergies();
  }

  @Post()
  createAllergy(@Body() dto: CreateAllergyDto) {
    return this.allergiesService.createAllergy(dto.name);
  }

  @Patch(':id')
  updateAllergy(@Param('id') id: string, @Body() dto: UpdateAllergyDto) {
    return this.allergiesService.updateAllergy(id, dto.name);
  }

  @Delete(':id')
  deleteAllergy(@Param('id') id: string) {
    return this.allergiesService.deleteAllergy(id);
  }
}
