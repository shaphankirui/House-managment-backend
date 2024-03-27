import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class TeamService {
    constructor(private readonly prisma: PrismaService) {}

    async createTeam(dto: TeamDto, userId: number) {
      const team = await this.prisma.team.create({
        data: {
          fullName: dto.fullName,
          position: dto.position,
          email: dto.email,
          phone: dto.phone,
          is_active: dto.is_active,
          pictureUrl: dto.pictureUrl,
          
        },
      });
  
      return team;
    }
  
    async getAllTeam() {
      return this.prisma.team.findMany({
      });
    }
    
  
    async getTeamById(id: number) {
      const team = await this.prisma.team.findUnique({
        where: { id },
      });
  
      if (!team) {
        throw new NotFoundException(`team with ID ${id} not found`);
      }
  
      return team;
    }
  
    async updateTeam(id: number, dto: TeamDto) {
      const existingTeam = await this.prisma.team.findUnique({
        where: { id },
      });
  
      if (!existingTeam) {
        throw new NotFoundException(`team member with ID ${id} not found`);
      }
  
      return this.prisma.team.update({
        where: { id },
        data: dto,
      });
    }
  
    async deleteTeam(id: number) {
      const existingTeam = await this.prisma.team.findUnique({
        where: { id },
      });
  
      if (!existingTeam) {
        throw new NotFoundException(`team member with ID ${id} not found`);
      }
  
      return this.prisma.team.delete({
        where: { id },
      });
    }
}
