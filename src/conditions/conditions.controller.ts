import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Get()
  getAllConditions() {
    return this.conditionsService.getAllConditions();
  }

  @Post()
  createCondition(@Body() dto: CreateConditionDto) {
    return this.conditionsService.createCondition(dto);
  }

  @Patch(':id')
  updateCondition(@Param('id') id: string, @Body() dto: UpdateConditionDto) {
    return this.conditionsService.updateCondition(id, dto);
  }

  @Delete(':id')
  deleteCondition(@Param('id') id: string) {
    return this.conditionsService.deleteCondition(id);
  }
}
