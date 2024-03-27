
import { IsString, IsNotEmpty } from 'class-validator';

export class NewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
  // @IsString()
  // @IsNotEmpty()
  // postedBy: string;

  @IsString()
  @IsNotEmpty()
  pictureUrl: string; // Add this line for the picture URL
}
