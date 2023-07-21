import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RequestException} from "../common/exceptions/request.exception";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createProductDto)
  }

  async findProductListPaginated(page: number, limit: number): Promise<{ items: Product[], total: number }> {
    const [items, total] = await this.productsRepository
      .createQueryBuilder('product')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }

  async update(id: number, updates: Partial<Product>): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where:{id}
    });
    if (!product) {
      throw new RequestException(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...product, ...updates };
    return this.productsRepository.save(updatedProduct);
  }
}
