import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  /*
  * 注意点：
  * - 分页查询作者信息，查询非 book 的数据
  * - 请求方式 http://localhost:3009/author?page=2&limit=5
  * - 从 page = 1 开始
  *
  * */
  @Get()
  findPagination(
    @Query(new PaginationPipe()) {page, limit}: { page: number; limit: number },
  ) {
    console.log('test', typeof limit, page);

    return this.authorService.findPagination((page), (limit));
  }

  /*
  *
  * 注意点：
  * - 获取作者的详情
  * - 请求方式 http://localhost:3009/author/:authorId
  * */
  @Get(':authorId')
  async getInfoById(@Param('authorId') authorId: number){
    return this.authorService.getInfoById(authorId);
  }

  @Put(':authorId')
  async updateById(
    @Param('authorId') authorId: number,
    @Body() updateAuthorDto: UpdateAuthorDto
  ){
    return this.authorService.updateById(authorId, updateAuthorDto)
  }
}
