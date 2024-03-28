import { Injectable, NotFoundException } from '@nestjs/common';
import { HouseDto } from './dto/house.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class HousesService {
    constructor(private readonly prisma: PrismaService) {}

  async createHouse(dto: HouseDto, userId: number) {
    const slug = slugify(dto.title, { lower: true, strict: true }); // Generate slug from title
    const house = await this.prisma.house.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        pictureUrl: dto.pictureUrl, 
        country: dto.country,
        mapAdress: dto.mapAdress,
        is_open: true,
        county: dto.county,
        interiorDetails: dto.interiorDetails, 
        latitude: dto.latitude,
        longitude: dto.longitude,
        outdoorDetails: dto.outdoorDetails, 
        Utilities: dto.Utilities, 
        otherFeatures: dto.otherFeatures, 
        price: dto.price,
        user: { connect: { id: userId } },
      },
    });

    return house;
  }

  async getAllHouses() {
    return this.prisma.house.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            // Exclude the password field
          },
        },
      },
    });
  }
  

  async getHousesById(id: number) {
    const house = await this.prisma.house.findUnique({
      where: { id },
    });

    if (!house) {
      throw new NotFoundException(`house with ID ${id} not found`);
    }

    return house;
  }

  async updateHouse(id: number, dto: HouseDto) {
    const existingHouse = await this.prisma.house.findUnique({
      where: { id },
    });

    if (!existingHouse) {
      throw new NotFoundException(`house with ID ${id} not found`);
    }

    return this.prisma.house.update({
      where: { id },
      data: dto,
    });
  }

  async deleteHouse(id: number) {
    const existingHouse = await this.prisma.house.findUnique({
      where: { id },
    });

    if (!existingHouse) {
      throw new NotFoundException(`house with ID ${id} not found`);
    }

    return this.prisma.house.delete({
      where: { id },
    });
  }
}
