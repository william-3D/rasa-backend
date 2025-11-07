import { IsOptional, IsString, IsInt, Min, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FindAllRecipesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 12;

  @IsOptional()
  @Transform(
    ({ value }) => (Array.isArray(value) ? value : [value]) as string[],
  )
  @IsString({ each: true })
  region?: string[];

  @IsOptional()
  @Transform(
    ({ value }) => (Array.isArray(value) ? value : [value]) as string[],
  )
  @IsString({ each: true })
  condition?: string[];

  @IsOptional()
  @Transform(
    ({ value }) => (Array.isArray(value) ? value : [value]) as string[],
  )
  @IsString({ each: true })
  allergy?: string[];

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  useUserFilters?: boolean = false;
}
