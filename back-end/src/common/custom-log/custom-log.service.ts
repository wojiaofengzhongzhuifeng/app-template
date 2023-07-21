// custom-logger.service.ts
import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLogService implements LoggerService {
  log(message: any, context?: string) {
    // 实现自定义日志记录逻辑
    console.log(message, context)
  }

  error(message: any, trace?: string, context?: string) {
    // 实现自定义错误日志记录逻辑
  }

  warn(message: any, context?: string) {
    // 实现自定义警告日志记录逻辑
  }

  debug(message: any, context?: string) {
    // 实现自定义调试日志记录逻辑
  }

  verbose(message: any, context?: string) {
    // 实现自定义详细日志记录逻辑
  }
}
