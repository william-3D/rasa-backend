import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => {
    return typeof value === 'string' ? value.toLowerCase() : value;
  })
  name: string;
}
