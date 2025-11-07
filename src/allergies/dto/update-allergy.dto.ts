import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAllergyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
