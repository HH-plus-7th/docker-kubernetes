import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { AddCartItemDto } from '../common/dto';
import { CartService } from './cart.service';

@ApiTags('cart')
@ApiCookieAuth()
@Controller('cart')
export class CartController {
  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Return the authenticated user cart.' })
  @ApiOkResponse({ description: 'Cart returned.' })
  async getCart(@Req() request: Request) {
    const user = await this.authService.requireAuthenticatedUser(request);
    return this.cartService.getCart(user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add a product to the authenticated user cart.' })
  @ApiBody({ type: AddCartItemDto })
  async addItem(@Req() request: Request, @Body() body: AddCartItemDto) {
    const user = await this.authService.requireAuthenticatedUser(request);
    return this.cartService.addItem(user.id, body.productId, body.quantity);
  }
}
