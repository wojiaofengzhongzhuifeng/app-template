// common/exceptions/custom-error.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import {getKeyByValue} from "../utils";
import {MessageCodeMap} from "../interceptors/response.interceptor";

export class CustomError1 extends HttpException {
  messageCode: number;

  constructor(customCode: number) {
    const response = getKeyByValue(MessageCodeMap, customCode)

    super(response, HttpStatus.OK);
    this.messageCode = customCode;
  }
}
