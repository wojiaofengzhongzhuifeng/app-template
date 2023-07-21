import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";
import {BaseService} from "../common/base-module/base.service";
import {BaseController} from "../common/base-module/base.controller";
import {Category} from "./entities/category.entity";

@Controller('category')
export class CategoryController extends BaseController<Category, CreateCategoryDto, UpdateCategoryDto>{
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService)
  }

  @Get()
  getListByPagination(
    @Query(new PaginationPipe()) {page, limit}: { page: number; limit: number },
  ) {
    return super.getListByPagination({page, limit, entityString: 'category'})
  }

  @Get(':categoryId')
  async getAllInfoById(@Param('categoryId') categoryId: number){
    return super.getAllInfoById(categoryId, ['tags']);
  }
}
