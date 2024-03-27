import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @UseGuards(JwtGuard)
    @Post()
    async createTeam(@Body() dto: TeamDto, @GetUser() user: User) {
      // Add 'postedBy' field with user's first name
      return this.teamService.createTeam({ ...dto}, user.id);
    }
  
    @Get()
    async getAllTeam() {
      return this.teamService.getAllTeam();
    }
  
    @Get(':id')
    async getTeamById(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.teamService.getTeamById(numericId);
    }
  
    @Put(':id')
    async updateTeam(@Param('id') id: string, @Body() dto: TeamDto) {
      const numericId = parseInt(id, 10);
      return this.teamService.updateTeam(numericId, dto);
    }
  
    @Delete(':id')
    async deleteTeam(@Param('id') id: string) {
      const numericId = parseInt(id, 10);
      return this.teamService.deleteTeam(numericId);
    }
}
