import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  // todo @IsNumber() 与 authorId: number 重复了，可以去掉其中一个吗？
  @IsNotEmpty()
  @IsNumber()
  authorId: number
}
