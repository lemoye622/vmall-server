import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const ProductSchema = new Schema(
  {
    // 商品标题
    title: {
      type: String,
      required: true,
    },
    // 副标题
    subtitle: {
      type: String,
    },
    // 所属分类
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    // 价格
    price: {
      type: Number,
    },
    // 划线价格（原价）
    crossedOutPrice: {
      type: Number,
    },
    // 商品图片
    imageUrl: { type: String },
    // 商品详情
    details: {
      type: String,
    },
    // 是否新品
    isNew: {
      type: Boolean,
      default: false,
    },
    // 是否推荐
    isRecommended: {
      type: Boolean,
      default: false,
    },
    // 是否精品
    isPremium: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 100
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // 当保存文档时自动创建createdAt和updatedAt两个字段，启用时间戳
    toJSON: {
      // 定制toJSON方法，当文档转成JSON格式的时候调用
      virtuals: true, // 启用虚拟属性（数据库里没存，查询的时候能看到的属性）
      // 定义转换函数，用于修改文档的JSON表现形式
      transform(doc, ret) {
        ret.id = ret._id.toHexString(); // 将_id转换成id
        delete ret._id; // 删除原来的_id
        delete ret.__v; // 删除原来的__v
      },
    },
  },
);
