import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConditionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
