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
export class TagService {

  constructor(

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,


    private categoryService: CategoryService

  ) {

  }

  async create(createTagDto: CreateTagDto) {
    const {name, description, categoryId} = createTagDto
    const tag = new Tag()

    tag.description = description
    tag.name = name

    const category = await this.categoryService.findOne(categoryId)
    if (!category) {
      throw new RequestException(`无法找到 categoryId: ${categoryId} 的数据`)
    }
    tag.category = category


    const sqlResult = this.tagRepository.save(tag)
    return sqlResult
  }


  async delete(id: number) {
    return this.updateById(id, {isDel: 1})
  }

  async findPagination(page: number, limit: number): Promise<{ items: Tag[], total }> {
    console.log('page', page);
    console.log('limit', limit);
    const [items, total] = await queryEntityPagination<Tag>(this.tagRepository, 'tag', page, limit, {isDel: 0})



    return {items, total}
  }

  async getInfoById(id: number){

    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['category', 'contents']
    });

    if(!tag){
      throw new RequestException('无法根据 tagId 找到数据')
    }
    return tag
  }

  async updateById(id: number, updateTagDto: UpdateTagDto){
    const {categoryId} = updateTagDto
    const tag = await this.tagRepository.findOne({
      where: {id}
    })

    if(!tag) throw new RequestException(`tagId: ${id} 无法找到作者`);

    let updatedTag = {...tag, ...updateTagDto}


    if(categoryId){
      // 需要更新 category:tag 的关联关系
      const category = await this.categoryService.findOne(categoryId)
      if(!category){
        throw new RequestException(`无法根据 categoryId: ${categoryId} 无法找到数据`);
      }
      updatedTag.category = category
    }




    const saveResult = await this.tagRepository.save(updatedTag)

    console.log('saveResult', saveResult);

    return saveResult


  }

  async findOne(id: number){
    const tag = await this.tagRepository.findOne({
      where: {id}
    })
    return tag
  }
}
