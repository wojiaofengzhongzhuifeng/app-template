// common/filters/all-exceptions.filter.ts
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from '../exceptions/custom-error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let code: number;

    // todo 模版，遇到 404 情况，message 数据读取有问题

    if (exception instanceof CustomError) {
      console.log('exception customError', exception);
      status = exception.getStatus();
      message = exception.message;
      code = exception.messageCode;
    } else if (exception instanceof HttpException) {

      console.log('exception HttpException', JSON.stringify(exception));
      /*
      * exception HttpException 情况1
      {"response":"无法找到authorId 2 的数据","status":400,"message":"无法找到authorId 2 的数据","name":"RequestException"}
      *
      * exception HttpException 情况2
      {"response":{"statusCode":400,"message":["title must be a string"],"error":"Bad Request"},"status":400,"message":"Bad Request Exception","name":"BadRequestException"}

      * */

      // @ts-ignore
      if(typeof exception.response  === 'object'){
        const response = exception.getResponse()
        // @ts-ignore
        status = response.statusCode
        // @ts-ignore
        message = response.message[0]
        code = status
      } else {
        // 说明是class-validator 的错误类型
        // @ts-ignore
        status = exception.status;
        // @ts-ignore
        message = exception.response as string;
        code = status;

      }




    } else {
      console.log('exception other', exception);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      code = status;
    }

    response.status(status).json({
      code: code,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
