// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {User} from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}


  // 判断能否根据 username 与 password 找到用户信息
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getInfoByUsername(username);

    console.log('user123', user);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  // 根据用户信息，生成 jwt，
  async createJWTByUserInfo(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
