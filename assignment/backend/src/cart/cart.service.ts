import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { id: 'asc' }
    });

    return this.toCartSummary(items);
  }

  async addItem(userId: number, productId: number, quantity: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existing = await this.prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    const nextQuantity = (existing?.quantity ?? 0) + quantity;
    if (nextQuantity > product.stock) {
      throw new BadRequestException('Requested quantity exceeds available stock');
    }

    await this.prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId
        }
      },
      update: {
        quantity: nextQuantity
      },
      create: {
        userId,
        productId,
        quantity
      }
    });

    return this.getCart(userId);
  }

  private toCartSummary(
    items: Array<{
      id: number;
      quantity: number;
      product: {
        id: number;
        name: string;
        description: string;
        priceCents: number;
        stock: number;
      };
    }>
  ) {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPriceCents = items.reduce(
      (sum, item) => sum + item.quantity * item.product.priceCents,
      0
    );

    return {
      items,
      totalQuantity,
      totalPriceCents
    };
  }
}
