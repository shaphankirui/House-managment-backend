import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { NewsDto } from './dto';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createNews(@Body() dto: NewsDto, @GetUser() user: User) {
    // Add 'postedBy' field with user's first name
    return this.newsService.createNews({ ...dto}, user.id);
  }

  @Get()
  async getAllNews() {
    return this.newsService.getAllNews();
  }

  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.newsService.getNewById(numericId);
  }

  @Put(':id')
  async updateNews(@Param('id') id: string, @Body() dto: NewsDto) {
    const numericId = parseInt(id, 10);
    return this.newsService.updateNews(numericId, dto);
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.newsService.deleteNews(numericId);
  }
}
