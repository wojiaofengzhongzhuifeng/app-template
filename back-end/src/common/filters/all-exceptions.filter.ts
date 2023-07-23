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
import {CustomError1} from "../exceptions/custom-error-1";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number; // httpCode
    let message: string;
    let code: number; // code

    // todo 模版，遇到 404 情况，message 数据读取有问题

    if (exception instanceof CustomError) {
      console.log('exception customError', exception);

      // todo 确认 对于业务错误，有两种 httpcode？一种是 200 一种是非200（一般为400）
      // status = exception.getStatus();
      status = 200

      message = exception.message;
      code = exception.messageCode;
    } else if (exception instanceof CustomError1){
      console.log('exception customError', exception);

      // todo 确认 对于业务错误，有两种 httpcode？一种是 200 一种是非200（一般为400）
      // status = exception.getStatus();
      status = 200

      message = exception.message;
      code = exception.messageCode;
    }
    else if (exception instanceof HttpException) {

      console.log('exception HttpException123321', JSON.stringify(exception));
      /*
      * exception HttpException 情况1
      {"response":"无法找到authorId 2 的数据","status":400,"message":"无法找到authorId 2 的数据","name":"RequestException"}
      *
      * exception HttpException 情况2
      {"response":{"statusCode":400,"message":["title must be a string"],"error":"Bad Request"},"status":400,"message":"Bad Request Exception","name":"BadRequestException"}

      * */

      status = exception.getStatus()
      message = exception.getResponse() as string
      //@ts-ignore
      code = exception.messageCode



      /*
      // @ts-ignore
      if(typeof exception.response  === 'object'){
        const response = exception.getResponse()
        // @ts-ignore
        status = 400
        // @ts-ignore
        message = response.message[0]
        code = status
      } else {
        // 说明是class-validator 的错误类型
        // @ts-ignore
        status = 400
        // @ts-ignore
        message = exception.response as string;
        code = status;

      }

       */




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
