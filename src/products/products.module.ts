import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductsModule {}
