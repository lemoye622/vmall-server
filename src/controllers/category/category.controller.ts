import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { Category } from 'src/types/category.interface';
import { HttpResponse } from 'src/types/http_response.interface';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllActive(): Promise<HttpResponse<Category[]>> {
    const data = await this.categoryService.findAllActive();
    return {
      success: true,
      message: 'All active categories retrieved successfully',
      data,
    };
  }

  @Post()
  async create(
    @Body() createCategoryDto: Category | Category[],
  ): Promise<HttpResponse<Category | Category[]>> {
    const data = await this.categoryService.create(createCategoryDto);
    return {
      success: true,
      message: Array.isArray(createCategoryDto)
        ? 'Categories created successfully'
        : 'Category created successfully',
      data,
    };
  }

  @Get('products')
  async findCategoriesWithProducts(): Promise<HttpResponse<Category[]>> {
    let data: Category[] =
      await this.categoryService.findCategoriesWithProducts(2);
    return {
      success: true,
      message: 'Categories retrieved successfully',
      data,
    };
  }
}
