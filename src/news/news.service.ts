import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class NewsService {
    constructor(private readonly prisma: PrismaService) {}

  async createNews(dto: NewsDto, userId: number) {
    const slug = slugify(dto.title, { lower: true, strict: true }); // Generate slug from title
    const news = await this.prisma.news.create({
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

    return news;
  }

  async getAllNews() {
    return this.prisma.news.findMany({
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
  

  async getNewById(id: number) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException(`news with ID ${id} not found`);
    }

    return news;
  }

  async updateNews(id: number, dto: NewsDto) {
    const existingNews = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      throw new NotFoundException(`news with ID ${id} not found`);
    }

    return this.prisma.news.update({
      where: { id },
      data: dto,
    });
  }

  async deleteNews(id: number) {
    const existingNews = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      throw new NotFoundException(`news with ID ${id} not found`);
    }

    return this.prisma.news.delete({
      where: { id },
    });
  }
}
