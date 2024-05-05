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
}
