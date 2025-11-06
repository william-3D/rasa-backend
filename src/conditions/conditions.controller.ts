import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ConditionsService } from './conditions.service';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Get()
  getAllConditions() {
    return this.conditionsService.getAllConditions();
  }

  @Post()
  createCondition(@Body('name') name: string) {
    return this.conditionsService.createCondition(name);
  }

  @Patch(':id')
  updateCondition(@Param('id') id: string, @Body('name') name: string) {
    return this.conditionsService.updateCondition(id, name);
  }

  @Delete(':id')
  deleteCondition(@Param('id') id: string) {
    return this.conditionsService.deleteCondition(id);
  }
}
