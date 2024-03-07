// src/product/product.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './product.dto';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
}
