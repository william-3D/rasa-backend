import { IsArray, IsString } from 'class-validator';

export class UpdateAllergiesDto {
  @IsArray()
  @IsString({ each: true })
  allergyIds: string[];
}
