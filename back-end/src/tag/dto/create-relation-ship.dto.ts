import {IsArray, IsNumber} from "class-validator";

export class CreateRelationShipDTO{


  @IsNumber()
  categoryId: number

  @IsArray()
  tagIdList: number[]
}
