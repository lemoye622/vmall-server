import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from 'src/types/banner.interface';

// 通过@Injectable装饰器声明这是一个可注入的服务类
@Injectable()
export class BannerService {
  // 构造函数，通过@InjectModel这个参数装饰器注入Banner模型
  constructor(@InjectModel('Banner') private bannerModel: Model<Banner>) {}

  async findAllActive(): Promise<Banner[]> {
    return this.bannerModel.find({ isActive: true }).exec();
  }

  async create(createBannerDTO: Banner | Banner[]): Promise<Banner | Banner[]> {
    if (Array.isArray(createBannerDTO)) {
      return this.bannerModel.insertMany(createBannerDTO);
    } else {
      return new this.bannerModel(createBannerDTO).save();
    }
  }
}
