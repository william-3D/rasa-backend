import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
