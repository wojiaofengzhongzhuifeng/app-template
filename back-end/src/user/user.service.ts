import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../product/entities/product.entity";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {generateHashByString, queryEntityPagination} from "../common/utils";
import {RequestException} from "../common/exceptions/request.exception";
import {BaseService} from "../common/base-module/base.service";
import {LoggerInterface} from "../common/log/logger.interface";
import {CustomLogService} from "../common/custom-log/custom-log.service";

@Injectable()
export class UserService{

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) {

  }

  async create(createUserDto: CreateUserDto) {


    const cryptPassword = await generateHashByString(createUserDto.password)
    if(!cryptPassword){throw new RequestException('加密password 失败')}

    console.log('cryptPassword', cryptPassword);
    createUserDto.password = cryptPassword as string
    const sqlResult = this.userRepository.save(createUserDto)

    return sqlResult
  }

  async findPagination(page: number, limit: number): Promise<{ items: User[], total }> {
    console.log('page', page);
    console.log('limit', limit);
    const [items, total] = await queryEntityPagination<User>(this.userRepository, 'user', page, limit)
    return {items, total}
  }

  async getInfoById(id: number){

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if(!user){
      throw new RequestException('无法根据 userId 找到数据')
    }
    return user
  }

  async getInfoByUsername(username: string){

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if(!user){
      throw new RequestException('无法根据 username 找到数据')
    }
    return user
  }

  async updateById(id: number, updateUserDto: UpdateUserDto){
    const user = await this.userRepository.findOne({
      where: {id}
    })

    if(!user) throw new RequestException(`userId: ${id} 无法找到作者`);

    let updatedUser = {...user, ...updateUserDto}

    const saveResult = await this.userRepository.save(updatedUser)

    console.log('saveResult', saveResult);

    return saveResult


  }
}
