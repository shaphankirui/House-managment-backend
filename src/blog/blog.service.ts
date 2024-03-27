// src/blog/blog.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify'; // Import slugify library


@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async createBlog(dto: BlogDto, userId: number) {
    const slug = slugify(dto.title, { lower: true, strict: true }); // Generate slug from title
    const blog = await this.prisma.blog.create({
      data: {
        title: dto.title,
        slug, // Assign slug to the database
        body: dto.body,
        pictureUrl: dto.pictureUrl,
        // postedBy: dto.postedBy, 
        user: {
          connect: { id: userId },
        },
      },
    });

    return blog;
  }

  async getAllBlogs() {
    return this.prisma.blog.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            // Exclude the password field
          },
        },
      },
    });
  }
  

  async getBlogById(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  async updateBlog(id: number, dto: BlogDto) {
    const existingBlog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return this.prisma.blog.update({
      where: { id },
      data: dto,
    });
  }

  async deleteBlog(id: number) {
    const existingBlog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
