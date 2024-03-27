// src/product/dto/product.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  model: string;
  @IsString()
  SAP: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  picture?: string; // Assuming this is a URL to the product picture

  @IsOptional()
  @IsBoolean()
  availability?: boolean;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  countable?: boolean;
}
