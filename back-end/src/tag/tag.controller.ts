import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";
import {BaseController} from "../common/base-module/base.controller";
import {Tag} from "./entities/tag.entity";
import {CreateRelationShipDTO} from "./dto/create-relation-ship.dto";

@Controller('tag')
export class TagController extends BaseController<Tag, CreateTagDto, UpdateTagDto>{
  constructor(private readonly tagService: TagService) {
    super(tagService)
  }



  @Get()
  getData(
    @Query(new PaginationPipe()) {page, limit, id}: { page: number; limit: number, id: number},
  ) {
    if(id){
      return  super.getData({id, relateEntityStringList: ['contents']});
    } else {
      return  super.getData({limit, page, entityString: 'tag'})
    }

  }

  @Post('relationship')
  createRelationshipWithCategory(@Body() createRelationShipDTO: CreateRelationShipDTO){
    return this.tagService.createRelationshipWithCategoryService(createRelationShipDTO)
  }


}
