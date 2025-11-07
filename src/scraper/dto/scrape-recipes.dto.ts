import { IsOptional, IsString } from 'class-validator';

export class ScrapeRecipesDto {
  @IsOptional()
  @IsString()
  query?: string;
}
