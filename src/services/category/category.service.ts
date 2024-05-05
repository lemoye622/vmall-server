import { Category } from './../../types/category.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async findAllActive(): Promise<Category[]> {
    return this.categoryModel.find({ isActive: true }).exec();
  }

  async create(
    createCategoryDto: Category | Category[],
  ): Promise<Category | Category[]> {
    if (Array.isArray(createCategoryDto)) {
      return this.categoryModel.insertMany(createCategoryDto);
    } else {
      const newCategory = new this.categoryModel(createCategoryDto);
      return newCategory.save();
    }
  }
}
