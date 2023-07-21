// common/exceptions/resource-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import {MessageCodeMap} from "../interceptors/response.interceptor";

export class InternalErrorException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
