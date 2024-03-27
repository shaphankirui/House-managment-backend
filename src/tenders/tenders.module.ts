import { Module } from '@nestjs/common';
import { TendersService } from './tenders.service';
import { TendersController } from './tenders.controller';

@Module({
  providers: [TendersService],
  controllers: [TendersController]
})
export class TendersModule {}
