// src/order/dto/order.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  items: any; // Adjust the type according to your data structure

  @IsNumber()
  @IsPositive()
  total: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsPositive()
  payment: number;

  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
