import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {DynamicLoggerModule} from "../common/log/dynamic-logger.module";
import {LogModule} from "../common/custom-log/custom-log.module";

// todo 模版，将 log 内容保存下来
// todo 模版 全局添加 isDel 过滤逻辑
// todo 模版 完成 BaseController 与 BaseService
@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
