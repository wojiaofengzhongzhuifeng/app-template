import { IsNumber } from 'class-validator';

export class CreateProductDto {
  name: string
  description: string
  @IsNumber()
  price: number
}
