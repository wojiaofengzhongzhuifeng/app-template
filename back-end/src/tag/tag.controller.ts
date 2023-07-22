import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";
import {BaseController} from "../common/base-module/base.controller";
import {Tag} from "./entities/tag.entity";

@Controller('tag')
export class TagController extends BaseController<Tag, CreateTagDto, UpdateTagDto>{
  constructor(private readonly tagService: TagService) {
    super(tagService)
  }

  // @Post()
  // create(@Body() createTagDto: CreateTagDto) {
  //   return this.tagService.create(createTagDto);
  // }

  // @Delete()
  // delete(
  //   @Query('id') id
  // ){
  //   return this.tagService.delete(id)
  // }

  // @Put(':tagId')
  // async updateById(
  //   @Param('tagId') tagId: number,
  //   @Body() updateTagDto: UpdateTagDto
  // ){
  //   return this.tagService.updateById(tagId, updateTagDto)
  // }

  /*
  * 注意点：
  * - 分页查询作者信息，查询非 book 的数据
  * - 请求方式 http://localhost:3009/tag?page=2&limit=5
  * - 从 page = 1 开始
  *
  * */
  @Get()
  getListByPagination(
    @Query(new PaginationPipe()) {page, limit}: { page: number; limit: number },
  ) {
    return super.getListByPagination({page, limit, entityString: 'tag'})
  }

  /*
  *
  * 注意点：
  * - 获取作者的详情
  * - 请求方式 http://localhost:3009/tag/:tagId
  * */
  @Get(':tagId')
  async getAllInfoById(@Param('categoryId') tagId: number){
    return super.getAllInfoById(tagId, ['contents']);
  }


}
