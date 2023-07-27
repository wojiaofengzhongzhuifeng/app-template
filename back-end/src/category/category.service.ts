import {Inject, Injectable} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../product/entities/product.entity";
import {Repository} from "typeorm";
import {Category} from "./entities/category.entity";
import {queryEntityPagination} from "../common/utils";
import {RequestException} from "../common/exceptions/request.exception";
import {BaseService} from "../common/base-module/base.service";
import {LoggerInterface} from "../common/log/logger.interface";
import {CustomLogService} from "../common/custom-log/custom-log.service";

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository)
  }



}
