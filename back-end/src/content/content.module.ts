import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Content} from "./entities/content.entity";
import {DynamicLoggerModule} from "../common/log/dynamic-logger.module";
import {LogModule} from "../common/custom-log/custom-log.module";
import {TagModule} from "../tag/tag.module";

@Module({
  imports: [TypeOrmModule.forFeature([Content]), DynamicLoggerModule.forRoot({
    // type: 'console',
    type: 'file',
    filePath: './logs/log.txt',
  }),
    LogModule,
    TagModule
  ],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
