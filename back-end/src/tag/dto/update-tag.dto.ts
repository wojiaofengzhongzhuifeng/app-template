import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import {Category} from "../../category/entities/category.entity";

export class UpdateTagDto extends PartialType(CreateTagDto) {
  category: Category
}
