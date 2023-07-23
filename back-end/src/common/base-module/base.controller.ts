import {Body, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {BaseService} from "./base.service";
import {PaginationPipe} from "../pipes/pagination.pipe";
import {RequestException} from "../exceptions/request.exception";

export abstract class BaseController<T, C, U> {

  // 表示 controller 需要引用 service
  constructor(private readonly service: BaseService<T, C, U>) {}

  @Post()
  @HttpCode(200)
  create(@Body() createDTO: C) {
    return this.service.createService(createDTO);
  }

  @Delete()
  delete(
    @Query('id') id
  ){
    return this.service.deleteService(id)
  }

  @Put()
  async updateById(
    @Query('id') id: number,
    @Body() updateDTO: U
  ){
    return this.service.updateByIdService(id, updateDTO)
  }

  @Get()
  getData(
    @Query(new PaginationPipe())
      {page, limit, id, relateEntityStringList, entityString}: { page?: number; limit?: number, id?: number, relateEntityStringList?: string[], entityString?: string},
  ) {

    // throw new RequestException('error')
    if(id){
      return this.service.getAllInfoByIdService({id, relateEntityStringList,} );
    } else {
      return this.service.getListByPaginationService({entityString,page,limit});
    }

  }

//   /*
// *
// * 注意点：
// * - 请求方式 http://localhost:3009/category/:categoryId
// * */
//   @Get()
//   async getAllInfoById(@Param('id') id: number, relateEntityStringList: string[]){
//     return this.service.getAllInfoById(id, relateEntityStringList, );
//   }

}
