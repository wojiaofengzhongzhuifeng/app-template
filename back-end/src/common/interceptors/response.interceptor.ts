import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {getKeyByValue} from "../utils";

export const MessageCodeMap = {
  ok: 200,

  // 业务错误
  outOfStock: 20001, // 假设代表库存不足

  // 请求错误
  requestError: 40000, // 请求通用错误
  noFoundById: 40001, // 无法根据id找到数据

  // 响应错误
  internalError: 50000, // 服务器通用错误
  dataBaseError: 50001 // 服务器错误
}



export interface Response<T> {
  code: number;
  data: T;
  message: string
}

export interface Response1<T> {
  code?: number;
  data: T;
  message?: string
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(resp => {
        console.log('resp', resp);
        const message = resp.message ||'ok'
        const code = MessageCodeMap[message] || context.switchToHttp().getResponse().statusCode
        const data = resp.data || resp

        return {
          code,
          data,
          message
        }
      }),
    );
  }
}
