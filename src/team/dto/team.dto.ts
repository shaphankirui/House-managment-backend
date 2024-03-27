import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class TeamDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;


  @IsString()
  @IsNotEmpty()
  pictureUrl: string; 

}
