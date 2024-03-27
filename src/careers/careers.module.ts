import { Module } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersController } from './careers.controller';

@Module({
  providers: [CareersService],
  controllers: [CareersController]
})
export class CareersModule {}
