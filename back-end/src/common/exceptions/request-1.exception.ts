// common/exceptions/resource-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import {MessageCodeMap} from "../interceptors/response.interceptor";
import {getKeyByValue} from "../utils";

export class Request1Exception extends HttpException {
  messageCode: number;


  constructor(customCode: number = HttpStatus.BAD_REQUEST) {
    const response = getKeyByValue(MessageCodeMap, customCode)

    console.log('response111', response);

    super(response, HttpStatus.BAD_REQUEST);
    this.messageCode = customCode;

  }
}
