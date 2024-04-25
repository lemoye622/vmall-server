// 导入NestJS的模块
import { Module } from '@nestjs/common';
// 导入应用主控制器  控制器一般用来定义路由（路径），定义什么方法访问什么路径进行怎么处理
import { AppController } from './app.controller';
// 导入主服务 服务里主要是一些业务方法，用来对数据进行处理和加载
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema } from './schemas/banner.schema';
import { BannerController } from './controllers/banner/banner.controller';
import { BannerService } from './services/banner/banner.service';
import { NavigationMenuSchema } from './schemas/navigation_menu.schema';
import { NavigationMenuService } from './services/navigation_menu/navigation_menu.service';
import { NavigationMenuController } from './controllers/navigation_menu/navigation_menu.controller';

// 使用@Module装饰器定义模块，配置它的依赖和提供的服务
@Module({
  imports: [
    // 可以导入别的模块供自己使用
    // 配置mongoose连接到本地Mongodb数据库，数据库名字为vmall
    MongooseModule.forRoot('mongodb://127.0.0.1/vmall'),
    // 配置mongoose的模型
    MongooseModule.forFeature([
      {
        name: 'Banner',
        schema: BannerSchema,
      },
      {
        name: 'NavigationMenu',
        schema: NavigationMenuSchema,
      },
    ]),
  ],
  controllers: [AppController, BannerController, NavigationMenuController], // 指定该模块使用的控制器
  providers: [AppService, BannerService, NavigationMenuService], // 指定该模块使用的服务提供者
})
// 导出模块类，以供Nest应用工厂创建实例的时候使用
export class AppModule {}
