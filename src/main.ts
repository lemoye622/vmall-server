// 导入NestFactory工厂类，用来创建Nest应用实例
import { NestFactory } from '@nestjs/core';
// 主模块，用来组织Nest应用的入口
import { AppModule } from './app.module';

async function bootstrap() {
  // 创建Nest应用实例
  const app = await NestFactory.create(AppModule);
  // 启用跨域功能
  app.enableCors();
  // 监听3000端口，启动HTTP服务器
  await app.listen(3000);
}
// 调用启动函数启动应用
bootstrap();
