// src/blog/dto/blog.dto.ts
import { IsString, IsOptional, IsNotEmpty, isBoolean, IsBoolean } from 'class-validator';

export class HouseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString({ each: true })
  @IsOptional()
  pictureUrl: string[];

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  mapAdress: string;

  @IsString()
  @IsOptional()
  county: string;

  @IsString()
  @IsOptional()
  latitude: string;

  @IsString()
  @IsOptional()
  longitude: string;

  @IsBoolean()
  @IsOptional()
  is_open: boolean;

  @IsString({ each: true })
  @IsOptional()
  interiorDetails: string[];

  @IsString({ each: true })
  @IsOptional()
  outdoorDetails: string[];

  @IsString({ each: true })
  @IsOptional()
  Utilities: string[];

  @IsString({ each: true })
  @IsOptional()
  otherFeatures: string[];
  
}