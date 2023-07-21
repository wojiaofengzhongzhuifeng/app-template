// common/exceptions/custom-error.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  messageCode: number;

  constructor(messageCode: number, resource: string) {
    super(`自定义错误: ${resource}`, HttpStatus.BAD_REQUEST);
    this.messageCode = messageCode;
  }
}
