// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        description: dto.description,  // Add other fields as needed
        pictureUrl: dto.picture,    // Add other fields as needed
      },
    });
  }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }
}
