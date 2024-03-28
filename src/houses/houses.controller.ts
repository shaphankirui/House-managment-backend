import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HousesService } from './houses.service';
import { JwtGuard } from 'src/auth/guard';
import { HouseDto } from './dto/house.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('houses')
export class HousesController {
    constructor(private readonly houseService: HousesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createHouse(@Body() dto: HouseDto, @GetUser() user: User) {
    // Add 'postedBy' field with user's first name
    return this.houseService.createHouse({ ...dto}, user.id);
  }

  @Get()
  async getAllHouses() {
    return this.houseService.getAllHouses();
  }

  @Get(':id')
  async getHouseById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.houseService.getHousesById(numericId);
  }

  @Put(':id')
  async updateHouse(@Param('id') id: string, @Body() dto: HouseDto) {
    const numericId = parseInt(id, 10);
    return this.houseService.updateHouse(numericId, dto);
  }

  @Delete(':id')
  async deleteHouse(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.houseService.deleteHouse(numericId);
  }
}
