import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateConditionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
