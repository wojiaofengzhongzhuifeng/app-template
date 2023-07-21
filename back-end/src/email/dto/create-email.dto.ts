import {IsString} from "class-validator";

export class CreateEmailDto {

  @IsString()
  email:string

  @IsString()
  subject: string

  @IsString()
  content:string
}
