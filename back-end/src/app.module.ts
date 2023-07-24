import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ResponseInterceptor} from "./common/interceptors/response.interceptor";
import { ProductModule } from './product/product.module';
import {Product} from "./product/entities/product.entity";
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import {Author} from "./author/entities/author.entity";
import {Book} from "./book/entities/book.entity";
import {DynamicLoggerModule} from "./common/log/dynamic-logger.module";
import {LogModule} from "./common/custom-log/custom-log.module";
import {UserModule} from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import {FileUploadModule} from "./common/file-upload/file-upload.module";
import {CategoryModule} from "./category/category.module";
import {TagModule} from "./tag/tag.module";
import {ContentModule} from "./content/content.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from "path";


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // todo 环境变量
      password: 'raojiajun111',
      database: 'cms',
      autoLoadEntities: true,
      synchronize: true, // todo 生产环境设置为 false
      entities: [],
    }),
    ScheduleModule.forRoot(),
    // ProductModule,
    // AuthorModule,
    // BookModule,
    // DynamicLoggerModule.forRoot({
    //   type: 'console',
    //   // type: 'file',
    //   // filePath: './log.txt',
    // }),
    // LogModule,
    // UserModule,
    // AuthModule,
    // EmailModule,
    FileUploadModule,
    CategoryModule,
    TagModule,
    ContentModule,
    ServeStaticModule.forRoot({
      // 通过 http://localhost:3009/translate-js/1689935479503-test111.zip 访问静态资源
      rootPath: path.resolve(__dirname, './../uploads')
    }),
  ],
  controllers: [AppController],
  providers: [
    // 注册拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ,AppService],
})
export class AppModule {}
