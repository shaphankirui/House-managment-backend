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
  @IsNotEmpty()
  pictureUrl: string[];

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  mapAdress: string;

  @IsString()
  @IsNotEmpty()
  county: string;

  @IsString()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  longitude: string;

  @IsBoolean()
  @IsNotEmpty()
  is_open: boolean;

  @IsString({ each: true })
  @IsNotEmpty()
  interiorDetails: string[];

  @IsString({ each: true })
  @IsNotEmpty()
  outdoorDetails: string[];

  @IsString({ each: true })
  @IsNotEmpty()
  Utilities: string[];

  @IsString({ each: true })
  @IsNotEmpty()
  otherFeatures: string[];
  
}