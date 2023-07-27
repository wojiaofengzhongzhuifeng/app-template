import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Inject, forwardRef} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";
import {BaseService} from "../common/base-module/base.service";
import {BaseController} from "../common/base-module/base.controller";
import {Category} from "./entities/category.entity";
import {TagService} from "../tag/tag.service";

@Controller('category')
export class CategoryController extends BaseController<Category, CreateCategoryDto, UpdateCategoryDto>{
  constructor(
    private readonly categoryService: CategoryService,
    private tagService: TagService,
  )
  {
    super(categoryService)
  }



  @Get()
  getData(
    @Query(new PaginationPipe()) {page, limit, id}: { page: number; limit: number, id: number},
  ) {
    if(id){
      let category = super.getData({id});
      let tagList = this.tagService.findOneByQueryService({
        categoryId: id
      })
      console.log('tagList', tagList);
      return {...category, items: tagList}
    } else {
      return  super.getData({limit, page, entityString: 'category'})
    }

  }
}
