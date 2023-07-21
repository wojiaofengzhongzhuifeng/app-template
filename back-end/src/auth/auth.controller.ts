import { Body, Post, UnauthorizedException, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // 假设你有一个 DTO 来接收登录请求的数据

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException(); // 如果用户名或密码无效，抛出一个 401 错误
    }
    let result = this.authService.createJWTByUserInfo(user); // 如果验证成功，调用 login 方法生成并返回 JWT
    console.log(result);
    return result
  }
}
