import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {MessageCodeMap, Response1} from "./common/interceptors/response.interceptor";
import {AgeGreateThan18Pipe} from "./common/pipes/age-greate-than-18.pipe";
import {CustomError} from "./common/exceptions/custom-error";
import {RequestException} from "./common/exceptions/request.exception";
import {InternalErrorException} from "./common/exceptions/internal-error.exception";
import {Request1Exception} from "./common/exceptions/request-1.exception";
import {InternalError1Exception} from "./common/exceptions/internal-error-1.exception";
import {CustomError1} from "./common/exceptions/custom-error-1";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}


  // hello world api
  @Get('test')
  getHello(): Response1<{a: number}> {
    return this.appService.getHello();
  }


  // @Get('test1')
  // getHello1(): Response1<{a: number}> {
  //   return this.appService.getHello1();
  // }

  //
  @Get('test2')
  getHello2(): Response1<{a: number}> {
    return this.appService.getHello2();
  }


  @Get('test3')
  getHello3(): Response1<{a: number}> {
    return this.appService.getHello3();
  }

  @Get('test4')
  getHello4(): Response1<{a: number}> {
    return this.appService.getHello4();
  }

  @Get('test5')
  getHello5(
    @Query('age', AgeGreateThan18Pipe) age
  ): Response1<string> {
    return this.appService.getHello5(age);
  }

  // 请求正常+响应正常+业务正常
  @Get('test-error-1')
  testError1(){
    return {a: 1}
  }

  // 业务错误
  @Get('test-error-2')
  testError2(){
    throw new CustomError1(MessageCodeMap.outOfStock);
  }

  // 请求错误
  @Get('test-error-3')
  testError3(){
    throw new Request1Exception(MessageCodeMap.noFoundById)
  }

  // 响应错误
  @Get('test-error-4')
  testError4(){
    throw new InternalError1Exception(MessageCodeMap.dataBaseError)
  }
}
