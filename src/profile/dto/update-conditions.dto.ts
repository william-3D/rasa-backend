import { IsArray, IsString } from 'class-validator';

export class UpdateConditionsDto {
  @IsArray()
  @IsString({ each: true })
  conditionIds: string[];
}
