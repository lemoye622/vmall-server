import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from 'src/services/product/product.service';
import { HttpResponse } from 'src/types/http_response.interface';
import { Product } from 'src/types/product.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllActive(): Promise<HttpResponse<Product[]>> {
    const data = await this.productService.findAllActive();
    return {
      success: true,
      message: 'All active products retrieved successfully',
      data,
    };
  }

  @Post()
  async create(
    @Body() createProductDto: Product | Product[],
  ): Promise<HttpResponse<Product | Product[]>> {
    const data = await this.productService.create(createProductDto);
    return {
      success: true,
      message: Array.isArray(createProductDto)
        ? 'Products created successfully'
        : 'Product created successfully',
      data,
    };
  }
}
