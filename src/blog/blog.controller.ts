// src/blog/blog.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createBlog(@Body() dto: BlogDto, @GetUser() user: User) {
    // Assuming the dto has a field 'pictureUrl' for the image URL
    return this.blogService.createBlog({ ...dto }, user.id);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }
}
