// orders.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(dto: OrderDto, userId: number) {
    return this.prisma.order.create({
      data: {
        items: dto.items,
        total: dto.total,
        status: dto.status,
        payment: dto.payment,
        customer: dto.customer,
        location: dto.location,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany();
  }

  async getOrderById(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateOrder(id: number, dto: OrderDto) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.prisma.order.update({
      where: { id },
      data: dto,
    });
  }

  async deleteOrder(id: number) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.prisma.order.delete({
      where: { id },
    });
  }
}
