import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BlogModule } from './blog/blog.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    BlogModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
     
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
