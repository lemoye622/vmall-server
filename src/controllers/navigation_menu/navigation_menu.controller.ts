import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NavigationMenuService } from 'src/services/navigation_menu/navigation_menu.service';
import { HttpResponse } from 'src/types/http_response.interface';
import { NavigationMenu } from 'src/types/navigation_menu.interface';

@Controller('navigationMenus')
export class NavigationMenuController {
  constructor(private readonly navigationMenuService: NavigationMenuService) {}

  @Get()
  async findAllActive(): Promise<HttpResponse<NavigationMenu[]>> {
    const data = await this.navigationMenuService.findAllActive();
    return {
      success: true,
      message: 'All active navigations retrieved successfully',
      data,
    };
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<HttpResponse<NavigationMenu>> {
    const data = await this.navigationMenuService.findById(id);
    if (!data) {
      throw new HttpException('NavigationMenu not found', HttpStatus.NOT_FOUND);
    }
    return {
      success: true,
      message: 'NavigationMenu retrieved successfully',
      data,
    };
  }

  @Post()
  async create(
    @Body() createNavigationDtos: NavigationMenu | NavigationMenu[],
  ): Promise<HttpResponse<NavigationMenu | NavigationMenu[]>> {
    const data = await this.navigationMenuService.create(createNavigationDtos);
    return {
      success: true,
      message: Array.isArray(createNavigationDtos)
        ? 'Navigation Menus created successfully'
        : 'Navigation Menu created successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNavigationDto: any,
  ): Promise<HttpResponse<NavigationMenu>> {
    const data = await this.navigationMenuService.update(
      id,
      updateNavigationDto,
    );
    return {
      success: true,
      message: 'NavigationMenu updated successfully',
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<HttpResponse<NavigationMenu>> {
    const data = await this.navigationMenuService.delete(id);
    return {
      success: true,
      message: 'NavigationMenu deleted successfully',
      data,
    };
  }
}
