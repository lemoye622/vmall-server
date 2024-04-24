import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const BannerSchema = new Schema(
  {
    imageUrl: {
      // banner图片路径
      type: String,
      require: true,
      trim: true, // 保存的时候若左右有空格会进行删除
      unique: true, // 此字段每条记录在整个集合中保证唯一
    },
    link: {
      // 点击之后跳到哪去
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    order: {
      // 顺序号
      type: Number,
      required: true,
    },
    isActive: {
      // 是否激活（可用）
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // 当保存文档时自动创建createAt和updateAt两个字段，启用时间戳
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
