// src/category/category.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
