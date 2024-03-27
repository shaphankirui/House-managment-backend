import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('careers')
export class CareersController {
    constructor(private readonly careersService: CareersService) {}

    @UseGuards(JwtGuard)
    @Post()
    async createCareers(@Body() dto: CareersDto, @GetUser() user: User) {
      // Add 'postedBy' field with user's first name
      return this.careersService.createCareer({ ...dto}, user.id);
    }
  
    @Get()
    async getAllCareers() {
      return this.careersService.getAllCareers();
    }
  
    @Get(':id')
    async getCareersById(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.careersService.getCareersById(numericId);
    }
  
    @Put(':id')
    async updateCareers(@Param('id') id: string, @Body() dto: CareersDto) {
      const numericId = parseInt(id, 10);
      return this.careersService.updateCareers(numericId, dto);
    }
  
    @Delete(':id')
    async deleteCareers(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.careersService.deleteCareer(numericId);
    }
}
