import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TendersService } from './tenders.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { TendersDto } from './dto';

@Controller('tenders')
export class TendersController {
    constructor(private readonly tebdersService: TendersService) {}

    @UseGuards(JwtGuard)
    @Post()
    async createTenders(@Body() dto: TendersDto, @GetUser() user: User) {
      // Add 'postedBy' field with user's first name
      return this.tebdersService.createTenders({ ...dto}, user.id);
    }
  
    @Get()
    async getAllTenders() {
      return this.tebdersService.getAllTenders();
    }
  
    @Get(':id')
    async getTendersById(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.tebdersService.getTendersById(numericId);
    }
  
    @Put(':id')
    async updateTenders(@Param('id') id: string, @Body() dto: TendersDto) {
      const numericId = parseInt(id, 10);
      return this.tebdersService.updateTenders(numericId, dto);
    }
  
    @Delete(':id')
    async deleteTenders(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.tebdersService.deleteTenders(numericId);
    }
}
