import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateTagDto {

  @IsString()
  name: string

  @IsString()
  description: string

  @IsNumber()
  @IsOptional()
  isDel: number

  @IsNotEmpty()
  @IsNumber()
  categoryId: number
}
