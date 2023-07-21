import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建用户
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findPagination(
  //   @Query(new PaginationPipe()) {page, limit}: { page: number; limit: number },
  // ) {
  //   console.log('test', typeof limit, page);
  //
  //   return this.userService.findPagination((page), (limit));
  // }

  // /user/info 与 /user/1 可能会重复，所以把特殊的路径放到前面
  @UseGuards(JwtAuthGuard) // 使用自定义的守卫
  @Get('info')
  getUserInfo(@Req() req) {
    // 请求被守卫允许通过后，你可以从 req.user 中获取解密的用户信息
    return req.user;
  }


  // 获取用户信息
  @Get(':userId')
  async getInfoById(@Param('userId') userId: number){
    return this.userService.getInfoById(userId);
  }


  // 更新用户信息
  @Put(':userId')
  async updateById(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto
  ){
    return this.userService.updateById(userId, updateUserDto)
  }



}
