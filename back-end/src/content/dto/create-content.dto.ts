import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

// todo 模版：CreateContentDto 与 Content 基本一致，去掉某些字段，新增某些字段
export class CreateContentDto {

  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  @IsOptional()
  isDel: number

  @IsString()
  text: string

  @IsNumber()
  @IsOptional()
  tagId: number

}
