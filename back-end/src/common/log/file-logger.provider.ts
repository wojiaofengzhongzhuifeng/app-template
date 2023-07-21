// file-logger.provider.ts
import { LoggerInterface } from './logger.interface';
import * as fs from 'fs';

export class FileLogger implements LoggerInterface {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  log(message: string, data?: any): void {
    let dataString = data ? JSON.stringify(data) : ''
    fs.appendFileSync(this.filePath, message + dataString + '\n');
  }
}
