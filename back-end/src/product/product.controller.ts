import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./entities/product.entity";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(createProductDto)
    // return sqlResul1
  }

  @Get()
  findProductListPaginated(@Query('page') page: number,@Query('limit') limit: number) {
    // page = 1 + limit = 5 表示查询第一页数据，每页 5 个，不需要从 page = 0 开始
    return this.productService.findProductListPaginated(page, limit);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updates: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, updates);
  }
}
