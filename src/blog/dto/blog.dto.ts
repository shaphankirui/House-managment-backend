// src/blog/dto/blog.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  pictureUrl: string; // Add this line for the picture URL
}
