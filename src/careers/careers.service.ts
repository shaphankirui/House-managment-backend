import { Injectable, NotFoundException } from '@nestjs/common';
import { CareersDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class CareersService {
    constructor(private readonly prisma: PrismaService) {}

    async createCareer(dto: CareersDto, userId: number) {
      const slug = slugify(dto.title, { lower: true, strict: true }); // Generate slug from title
      const careers = await this.prisma.careers.create({
        data: {
          title: dto.title,
          slug, // Assign slug to the database
          description: dto.description,
          requirements: dto.requirements,
          aplicationDateLine: dto.aplicationDateLine,
          is_open: dto.is_open,
          pictureUrl: dto.pictureUrl,
          fileUrl: dto.fileUrl,
          // postedBy: dto.postedBy, 
          user: {
            connect: { id: userId },
          },
        },
      });
  
      return careers;
    }
  
    async getAllCareers() {
      return this.prisma.careers.findMany({
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
    
  
    async getCareersById(id: number) {
      const careers = await this.prisma.careers.findUnique({
        where: { id },
      });
  
      if (!careers) {
        throw new NotFoundException(`careers with ID ${id} not found`);
      }
  
      return careers;
    }
  
    async updateCareers(id: number, dto: CareersDto) {
      const existingCareers = await this.prisma.careers.findUnique({
        where: { id },
      });
  
      if (!existingCareers) {
        throw new NotFoundException(`careers with ID ${id} not found`);
      }
  
      return this.prisma.careers.update({
        where: { id },
        data: dto,
      });
    }
  
    async deleteCareer(id: number) {
      const existingCareers = await this.prisma.careers.findUnique({
        where: { id },
      });
  
      if (!existingCareers) {
        throw new NotFoundException(`careers with ID ${id} not found`);
      }
  
      return this.prisma.careers.delete({
        where: { id },
      });
    }
}
