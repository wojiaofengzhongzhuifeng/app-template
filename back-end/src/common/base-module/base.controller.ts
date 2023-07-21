import {Body, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {BaseService} from "./base.service";
import {PaginationPipe} from "../pipes/pagination.pipe";

export abstract class BaseController<T, C, U> {

  // 表示 controller 需要引用 service
  constructor(private readonly service: BaseService<T, C, U>) {}

  @Post()
  create(@Body() createDTO: C) {
    return this.service.create(createDTO);
  }

  @Delete()
  delete(
    @Query('id') id
  ){
    return this.service.delete(id)
  }

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() updateDTO: U
  ){
    return this.service.updateById(id, updateDTO)
  }

  @Get()
  getListByPagination(
    @Query(new PaginationPipe()) {page, limit, entityString}: { page: number; limit: number,  entityString: string},
  ) {
    return this.service.getListByPagination(entityString, (page), (limit));
  }

  /*
*
* 注意点：
* - 请求方式 http://localhost:3009/category/:categoryId
* */
  @Get(':id')
  async getAllInfoById(@Param('id') id: number, relateEntityStringList: string[]){
    return this.service.getAllInfoById(id, relateEntityStringList, );
  }

}
