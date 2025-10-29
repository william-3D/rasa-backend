import { Controller, Get } from '@nestjs/common';
import { AllergiesService } from './allergies.service';

@Controller('allergies')
export class AllergiesController {
  constructor(private allergiesService: AllergiesService) {}
  // TODO: SUPPORT ALL @POST @PATCH @DELETE

  @Get()
  getAllAllergies() {
    return this.allergiesService.getAllAllergies();
  }
}
