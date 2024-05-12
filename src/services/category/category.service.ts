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

  // 返回前6个分类，以及每个分类下面的商品列表（每个商品列表只放2个商品）
  // 一级分类 ——> 二级分类 ——> 商品
  // 要想一条语句查询完成，需要用到 聚合查询
  async findCategoriesWithProducts(limit: number): Promise<Category[]> {
    return this.categoryModel.aggregate([
      {
        // $sort: { sortOrder: 1 }, // 按序号正序排列
        $sort: { createdAt: 1 }
      },
      {
        $limit: limit, // 限制结果为多少条
      },
      {
        // 使用$graphLookup进行深度递归查询，获取所有的后代分类
        $graphLookup: {
          from: 'categories', // 从哪个集合中查找
          startWith: '$_id', // 从当前文档中的哪个字段开始查
          connectFromField: '_id',
          connectToField: 'parent',
          as: 'allDescendants', // 把查询到的文档保存到什么地方
        },
      },
      {
        // 给当前的文档增加字段
        $addFields: {
          // 把找到的子类的文档全部取出，每个文档依次进行映射得到文档的ID，也就是分类的ID，变成分类数组存到allCategoryIds字段
          allCategoryIds: {
            $concatArrays: [
              ["$_id"],
              {
                $map: { input: '$allDescendants', as: 'desc', in: '$$desc._id' }
              }
            ]
          },
        },
      },
      // 嵌套管道
      {
        $lookup: {
          from: 'products', // 从商品列表里查询
          let: { allCatIds: '$allCategoryIds' }, // allCategoryIds数组赋值给变量allCatIds
          pipeline: [
            {
              $match: {
                $expr: {
                  // 查看此商品的分类id是否在子分类id的数组里
                  $in: ['$category', '$$allCatIds'],
                },
              },
            },
            {
              // $sort: { sortOrder: -1 }, // 按商品序号倒序排列
              $sort: { createdAt: -1 }
            },
            {
              $limit: 2, // 取前2条
            },
          ],
          as: 'products',
        },
      },
      {
        // 指定返回值字段
        $project: {
          _id: 1,
          name: 1,
          imageUrl: 1,
          parent: 1,
          sortOrder: 1,
          isActive: 1,
          products: 1,
        },
      },
    ]).exec();
  }
}
