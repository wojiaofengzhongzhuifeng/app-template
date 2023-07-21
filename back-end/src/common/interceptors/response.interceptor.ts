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
  user_not_have_limit: 10001,
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
