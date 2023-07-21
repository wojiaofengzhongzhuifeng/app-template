// dynamic-logger.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { LoggerInterface } from './logger.interface';
import { ConsoleLogger } from './console-logger.provider';
import { FileLogger } from './file-logger.provider';

export interface LoggerOptions {
  type: 'console' | 'file';
  filePath?: string;
}

@Module({})
export class DynamicLoggerModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    let loggerProvider: any;

    if (options.type === 'console') {
      loggerProvider = {
        provide: 'LoggerInterface',
        useClass: ConsoleLogger,
      };
    } else if (options.type === 'file') {
      loggerProvider = {
        provide: 'LoggerInterface',
        useFactory: () => new FileLogger(options.filePath),
      };
    }

    return {
      module: DynamicLoggerModule,
      providers: [loggerProvider],
      exports: [loggerProvider],
    };
  }
}
