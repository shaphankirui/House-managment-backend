import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BlogModule } from './blog/blog.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NewsModule } from './news/news.module';
import { TendersModule } from './tenders/tenders.module';
import { CareersModule } from './careers/careers.module';
import { TeamModule } from './team/team.module';
import { HousesModule } from './houses/houses.module';



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
    NewsModule,
    TendersModule,
    CareersModule,
    TeamModule,
    HousesModule,
     
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
