// orders.controller.ts

import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrderDto } from './orders.dto';
import { OrdersService } from './orders.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(@Body() dto: OrderDto, @GetUser() user: User) {
    return this.orderService.createOrder(dto, user.id);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    const numericId = parseInt(id, 10); // Convert to number
    console.log(`Controller - getOrderById - ID: ${numericId}`);
    return this.orderService.getOrderById(numericId);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() dto: OrderDto) {
    const numericId = parseInt(id, 10); // Convert to number
    return this.orderService.updateOrder(numericId, dto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    const numericId = parseInt(id, 10); // Convert to number
    return this.orderService.deleteOrder(numericId);
    
  }
}
