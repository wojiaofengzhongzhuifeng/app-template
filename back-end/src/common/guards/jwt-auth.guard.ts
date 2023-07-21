import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constant'; // 假设你在这个文件中定义了你的 JWT 密钥

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['access_token'];

    if (!token) {
      throw new UnauthorizedException(); // 如果没有 token，返回 401 错误
    }

    try {
      // 注意 jwt.verify 的主要作用并不是将 token 还原为原始数据，而是将 token 与 jwtConstants.secret 做验证，判断token 的第三部分 - 签名是否合法，如果不合法，会抛出错误
      const userInfo = jwt.verify(token, jwtConstants.secret);
      console.log('userInfo', userInfo);
      request.user = userInfo
      return true;
    } catch (error) {
      // 如果 token 无效，返回 401 错误
      throw new UnauthorizedException();
    }
  }
}
