// console-logger.provider.ts
import { LoggerInterface } from './logger.interface';

export class ConsoleLogger implements LoggerInterface {
  log(message: string, data: any): void {
    console.log(message, data);
  }
}
