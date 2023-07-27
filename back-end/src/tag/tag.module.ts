import {forwardRef, Module} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tag} from "./entities/tag.entity";
import {DynamicLoggerModule} from "../common/log/dynamic-logger.module";
import {LogModule} from "../common/custom-log/custom-log.module";
import {CategoryModule} from "../category/category.module";

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), DynamicLoggerModule.forRoot({
    // type: 'console',
    type: 'file',
    filePath: './logs/log.txt',
  }),
    LogModule,
    forwardRef(()=>CategoryModule)
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
