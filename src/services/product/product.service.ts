import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAllActive(): Promise<Product[]> {
    return this.productModel.find({ isActive: true }).exec();
  }

  async create(
    createProductDto: Product | Product[],
  ): Promise<Product | Product[]> {
    if (Array.isArray(createProductDto)) {
      return this.productModel.insertMany(createProductDto);
    } else {
      const newProduct = new this.productModel(createProductDto);
      return newProduct.save();
    }
  }

  async findPremiumProducts(): Promise<Product[]> {
    return this.productModel
      .find({ isPremium: true, isActive: true })
      .sort({ createdAt: -1 }) // 按照创建时间降序排列,创建越晚的越靠前
      .limit(6)
      .exec();
  }
}
