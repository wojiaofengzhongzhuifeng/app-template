import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";


// todo 模版，使用脚本，批量处理数据



@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Delete()
  delete(
    @Query('id') id
  ){
    return this.contentService.delete(id)
  }

  @Put(':contentId')
  async updateById(
    @Param('contentId') contentId: number,
    @Body() updateContentDto: UpdateContentDto
  ){
    return this.contentService.updateById(contentId, updateContentDto)
  }

  /*
  * 注意点：
  * - 分页查询作者信息，查询非 book 的数据
  * - 请求方式 http://localhost:3009/content?page=2&limit=5
  * - 从 page = 1 开始
  *
  * */
  @Get()
  findPagination(
    @Query(new PaginationPipe()) {page, limit}: { page: number; limit: number },
  ) {
    console.log('test', typeof limit, page);

    return this.contentService.findPagination((page), (limit));
  }

  /*
  *
  * 注意点：
  * - 获取作者的详情
  * - 请求方式 http://localhost:3009/content/:contentId
  * */
  @Get(':contentId')
  async getInfoById(@Param('contentId') contentId: number){
    return this.contentService.getInfoById(contentId);
  }


}
