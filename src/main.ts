/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    whitelist:true
  }));
  app.enableCors({
    origin: [
      '*',
      "https://realestate-management-two.vercel.app",
      "https://rentalbackoficefrontend.vercel.app",
      "https://realestatemanagement-app.vercel.app",
     "https://house-managment-backend.vercel.app",
      "http://localhost:3000",
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    // credentials: true
  });

  await app.listen(3000);
}
bootstrap();
