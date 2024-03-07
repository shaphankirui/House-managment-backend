// src/category/dto/category.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  picture?: string; // Assuming this is a URL to the category picture
}
