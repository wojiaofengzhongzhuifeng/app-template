// common/exceptions/resource-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import {MessageCodeMap} from "../interceptors/response.interceptor";

export class RequestException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
