import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {OmitType} from "@nestjs/mapped-types";
import {Tag} from "../entities/tag.entity";

export class CreateTagDto extends OmitType(Tag, ['id', 'createdAt', 'updatedAt', 'contents',]){


  @IsOptional()
  @IsNumber()
  categoryId: number
}
