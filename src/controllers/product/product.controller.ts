import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  // 查询最新的6个精品商品
  @Get('premium')
  async findPremium(): Promise<HttpResponse<Product[]>> {
    const data = await this.productService.findPremiumProducts();
    return {
      success: true,
      message: 'Premium products retrieved successfully',
      data,
    };
  }

  // 查询猜你喜欢的商品
  @Get('recommended')
  async findRecommended(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 4,
  ): Promise<HttpResponse<Product[]>> {
    await sleep(3000);
    const data = await this.productService.findRecommendedProducts(page, limit);
    return {
      success: true,
      message: 'Recommended products retrieved successfully',
      data,
    };
  }
}

function sleep(duration: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}
