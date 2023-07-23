// common/exceptions/resource-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import {MessageCodeMap} from "../interceptors/response.interceptor";
import {getKeyByValue} from "../utils";

export class InternalError1Exception extends HttpException {
  messageCode: number;

  constructor(customCode: number, data?: any) {
    // 为了保证 try catch 情况下，遇到 catch 的时候，可以直接通过 throw new InternalError1Exception(MessageCodeMap.internalError, e) 的方式将内部错误传给前端
    const response = data || getKeyByValue(MessageCodeMap, customCode)

    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
    this.messageCode = customCode;
  }
}
