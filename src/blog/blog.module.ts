import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [BlogService,CloudinaryService],
  controllers: [BlogController]
})
export class BlogModule {}
