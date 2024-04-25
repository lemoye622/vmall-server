import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const NavigationMenuSchema = new Schema(
  {
    iconUrl: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
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
