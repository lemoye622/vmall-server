import { Body, Controller, Get, Post } from '@nestjs/common';
import { BannerService } from '../../services/banner/banner.service';
import { Banner } from 'src/types/banner.interface';
import { HttpResponse } from 'src/types/http_response.interface';

// 定义控制器的装饰器，设置路径的前缀为banners
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async findAllActive(): Promise<HttpResponse<Banner[]>> {
    const data = await this.bannerService.findAllActive();
    return {
      success: true,
      message: 'All active banners retrieved successfully',
      data,
    };
  }

  @Post()
  async create(
    @Body() createBannerDTO: Banner | Banner[], // 使用Body参数装饰器用来获取请求体的数据并保存在createBannerDTO中
  ): Promise<HttpResponse<Banner | Banner[]>> {
    // data里的文档其实是mongoose专用文档对象，当返回给客户端的时候还需要调用toJSON转成json返回
    const data = await this.bannerService.create(createBannerDTO);
    return {
      success: true,
      message: Array.isArray(createBannerDTO)
        ? 'Banners created successfully'
        : 'Banner created successfully',
      data,
    };
  }
}
