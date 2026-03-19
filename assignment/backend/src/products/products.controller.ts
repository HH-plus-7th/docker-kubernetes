import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Return the public storefront product list.' })
  @ApiOkResponse({ description: 'Product list returned.' })
  async listProducts() {
    return this.productsService.listProducts();
  }
}
