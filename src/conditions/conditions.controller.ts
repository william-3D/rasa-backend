import { Controller, Get } from '@nestjs/common';
import { ConditionsService } from './conditions.service';

@Controller('conditions')
export class ConditionsController {
  constructor(private conditionsService: ConditionsService) {}

  @Get()
  getAllConditions() {
    return this.conditionsService.getAllConditions();
  }
}
