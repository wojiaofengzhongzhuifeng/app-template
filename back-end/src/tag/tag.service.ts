import {Inject, Injectable} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../product/entities/product.entity";
import {Repository} from "typeorm";
import {Tag} from "./entities/tag.entity";
import {queryEntityPagination} from "../common/utils";
import {RequestException} from "../common/exceptions/request.exception";
import {BaseService} from "../common/base-module/base.service";
import {LoggerInterface} from "../common/log/logger.interface";
import {CustomLogService} from "../common/custom-log/custom-log.service";
import {CategoryService} from "../category/category.service";

@Injectable()
export class TagService extends BaseService<Tag, CreateTagDto, UpdateTagDto>{

  constructor(

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,


    private categoryService: CategoryService

  ) {
    super(tagRepository)
  }

  async createService(createTagDto: CreateTagDto) {

    // 创建 tag 的时候，需要执行自定义的逻辑（），然后再执行通用逻辑
    // 1. 检查是否有category
    const {categoryId, name, description} = createTagDto
    let category = null
    if(categoryId){
      category = await this.categoryService.findOneService(categoryId)
      if(!category){
        throw new RequestException(`无法找到 categoryId: ${categoryId} 的数据`)
      }
    }

    // 2. 执行create通用逻辑
    const createTag = new Tag()
    createTag.name = name
    createTag.description = description
    createTag.category = category
    const sqlResult = await super.createService(createTag)
    return sqlResult

  }


  // async delete(id: number) {
  //   return super.delete(id)
  // }

  async updateByIdService(id: number, updateTagDto: UpdateTagDto){

    const {categoryId} = updateTagDto

    let category = null
    if(categoryId){
      category = await this.categoryService.findOneService(categoryId)
      if(!category){
        throw new RequestException(`根据 id:${id}, 无法找到数据`)
      }
    }
    updateTagDto.category = category

    // todo 这样做会导致响应数据中，多了一个 categoryId
    let sqlResult = super.updateByIdService(id, updateTagDto)

    return sqlResult





  }

  // async getListByPagination(page: number, limit: number): Promise<{ items: Tag[], total }> {
  //
  //   const [items, total] = await queryEntityPagination<Tag>(this.tagRepository, 'tag', page, limit, {isDel: 0})
  //
  //
  //
  //   return {items, total}
  // }

  // async getInfoById(id: number){
  //
  //   const tag = await this.tagRepository.findOne({
  //     where: { id },
  //     relations: ['category', 'contents']
  //   });
  //
  //   if(!tag){
  //     throw new RequestException('无法根据 tagId 找到数据')
  //   }
  //   return tag
  // }



}
