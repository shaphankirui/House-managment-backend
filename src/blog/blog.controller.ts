// src/blog/blog.controller.ts

import { Body, Controller, Get, Post, UseGuards, Param, Delete, Put } from '@nestjs/common';
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
    // Add 'postedBy' field with user's first name
    return this.blogService.createBlog({ ...dto}, user.id);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.blogService.getBlogById(numericId);
  }

  @Put(':id')
  async updateBlog(@Param('id') id: string, @Body() dto: BlogDto) {
    const numericId = parseInt(id, 10);
    return this.blogService.updateBlog(numericId, dto);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.blogService.deleteBlog(numericId);
  }
}
