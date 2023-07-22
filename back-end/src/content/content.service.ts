import {Inject, Injectable} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../product/entities/product.entity";
import {Repository} from "typeorm";
import {Content} from "./entities/content.entity";
import {queryEntityPagination} from "../common/utils";
import {RequestException} from "../common/exceptions/request.exception";
import {BaseService} from "../common/base-module/base.service";
import {LoggerInterface} from "../common/log/logger.interface";
import {CustomLogService} from "../common/custom-log/custom-log.service";
import {CategoryService} from "../category/category.service";
import {TagService} from "../tag/tag.service";

@Injectable()
export class ContentService{

  constructor(

    @InjectRepository(Content)
    private contentRepository: Repository<Content>,


    private tagService: TagService

  ) {

  }

  async create(createContentDto: CreateContentDto) {
    const {tagId} = createContentDto


    const test = {...new Content(), ...createContentDto}

    if(tagId){
      const tag = await this.tagService.findOneService(tagId)
      if (!tag) {
        throw new RequestException(`无法找到 categoryId: ${tagId} 的数据`)
      }
      test.tag = tag
    }



    const sqlResult = this.contentRepository.save(test)
    return sqlResult
  }


  async delete(id: number) {
    return this.updateById(id, {isDel: 1})
  }

  async findPagination(page: number, limit: number): Promise<{ items: Content[], total }> {
    console.log('page', page);
    console.log('limit', limit);
    const [items, total] = await queryEntityPagination<Content>(this.contentRepository, 'content', page, limit, {isDel: 0})



    return {items, total}
  }

  async getInfoById(id: number){

    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ['tag']
    });

    if(!content){
      throw new RequestException('无法根据 contentId 找到数据')
    }
    return content
  }

  async updateById(id: number, updateContentDto: UpdateContentDto){
    const {tagId} = updateContentDto
    const content = await this.contentRepository.findOne({
      where: {id}
    })

    if(!content) throw new RequestException(`contentId: ${id} 无法找到数据`);

    let updatedContent = {...content, ...updateContentDto}


    if(tagId){
      const tag = await this.tagService.findOneService(tagId)
      if(!tag){
        throw new RequestException(`无法根据 tagId: ${tagId} 无法找到数据`);
      }
      updatedContent.tag = tag
    }




    const saveResult = await this.contentRepository.save(updatedContent)

    console.log('saveResult', saveResult);

    return saveResult


  }
}
