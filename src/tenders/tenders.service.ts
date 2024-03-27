import { Injectable, NotFoundException } from '@nestjs/common';
import { TendersDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class TendersService {
    constructor(private readonly prisma: PrismaService) {}

    async createTenders(dto: TendersDto, userId: number) {
      const slug = slugify(dto.title, { lower: true, strict: true }); // Generate slug from title
      const tenders = await this.prisma.tenders.create({
        data: {
          title: dto.title,
          slug, // Assign slug to the database
          description: dto.description,
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
  
      return tenders;
    }
  
    async getAllTenders() {
      return this.prisma.tenders.findMany({
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
    
  
    async getTendersById(id: number) {
      const tenders = await this.prisma.tenders.findUnique({
        where: { id },
      });
  
      if (!tenders) {
        throw new NotFoundException(`tenders with ID ${id} not found`);
      }
  
      return tenders;
    }
  
    async updateTenders(id: number, dto: TendersDto) {
      const existingTenders = await this.prisma.tenders.findUnique({
        where: { id },
      });
  
      if (!existingTenders) {
        throw new NotFoundException(`tenders with ID ${id} not found`);
      }
  
      return this.prisma.tenders.update({
        where: { id },
        data: dto,
      });
    }
  
    async deleteTenders(id: number) {
      const existingTenders = await this.prisma.tenders.findUnique({
        where: { id },
      });
  
      if (!existingTenders) {
        throw new NotFoundException(`tenders with ID ${id} not found`);
      }
  
      return this.prisma.tenders.delete({
        where: { id },
      });
    }
}
