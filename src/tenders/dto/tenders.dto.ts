import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class TendersDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  aplicationDateLine: string;

  @IsBoolean()
  @IsNotEmpty()
  is_open: boolean;


  @IsString()
  @IsNotEmpty()
  pictureUrl: string; 

  @IsString()
  @IsNotEmpty()
  fileUrl: string; 
}
