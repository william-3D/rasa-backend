import { Controller, Get } from '@nestjs/common';
import { AllergiesService } from './allergies.service';

@Controller('allergies')
export class AllergiesController {
  constructor(private allergiesService: AllergiesService) {}

  @Get()
  getAllAllergies() {
    return this.allergiesService.getAllAllergies();
  }
}
