import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {Response1} from "./common/interceptors/response.interceptor";
import {AgeGreateThan18Pipe} from "./common/pipes/age-greate-than-18.pipe";

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

  @Get('test-error-1')
  testError(){
    return {a: 1}
  }
}
