// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: ProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        model: dto.model,
        SAP: dto.SAP,
        pictureUrl: dto.picture,  // Assuming this is a URL to the product picture
        availability: dto.availability,
        quantity: dto.quantity,
        countable: dto.countable,
        category: {
          connect: { id: dto.categoryId },
        },
      },
    });
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }
}
