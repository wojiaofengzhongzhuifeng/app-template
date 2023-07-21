// log.module.ts
import { Module } from '@nestjs/common';
import { CustomLogService } from './custom-log.service';

@Module({
  providers: [CustomLogService],
  exports: [CustomLogService],
})
export class LogModule {}
