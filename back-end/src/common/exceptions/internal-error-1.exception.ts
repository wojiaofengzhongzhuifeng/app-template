// common/exceptions/resource-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import {MessageCodeMap} from "../interceptors/response.interceptor";
import {getKeyByValue} from "../utils";

export class InternalError1Exception extends HttpException {
  messageCode: number;

  constructor(customCode: number) {
    const response = getKeyByValue(MessageCodeMap, customCode)

    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
    this.messageCode = customCode;
  }
}
