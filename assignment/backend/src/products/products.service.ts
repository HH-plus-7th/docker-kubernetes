import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listProducts() {
    const items = await this.prisma.product.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return { items };
  }
}
