// src/blog/blog.service.ts
import { Injectable } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async createBlog(dto: BlogDto, userId: number) {
    const blog = await this.prisma.blog.create({
      data: {
        title: dto.title,
        body: dto.body,
        pictureUrl: dto.pictureUrl, // Save the picture URL in the database
        user: {
          connect: { id: userId },
        },
      },
    });

    return blog;
  }

  async getAllBlogs() {
    return this.prisma.blog.findMany();
  }
}
