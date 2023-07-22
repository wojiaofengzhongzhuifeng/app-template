import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Content} from "../entities/content.entity";
import {OmitType} from "@nestjs/mapped-types";

// todo 模版：CreateContentDto 与 Content 基本一致，去掉某些字段，新增某些字段
export class CreateContentDto extends OmitType(Content, ['id', 'tag']){

  // @IsString()
  // title: string
  //
  // @IsString()
  // description: string
  //
  // @IsNumber()
  // @IsOptional()
  // isDel: number
  //
  // @IsString()
  // text: string

  @IsNumber()
  @IsOptional()
  tagId: number

}
