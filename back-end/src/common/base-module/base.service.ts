import {FindOptionsWhere, Repository} from "typeorm";
import {CreateCategoryDto} from "../../category/dto/create-category.dto";
// import {UpdateCategoryDto} from "../../category/dto/update-category.dto";
import {RequestException} from "../exceptions/request.exception";
import {Category} from "../../category/entities/category.entity";
import {queryEntityPagination} from "../utils";

export abstract class BaseService<T, C, U> {
  constructor(private readonly repository: Repository<T>) {}

  async create(createDTO: any) {
    const result = await this.repository.save(createDTO)
    return result
  }

  async delete(id: number) {
    // @ts-ignore
    return this.updateById(id, {isDel: 1})
  }

  async updateById(id: number, updateDTO: U){
    const result = await this.repository.findOne({
      where: {id} as unknown as FindOptionsWhere<T>
    })

    if(!result) throw new RequestException(`根据 id:${id}, 无法找到数据`);

    let newResult = {...result, ...updateDTO}

    const saveResult = await this.repository.save(newResult)

    return saveResult


  }

  async getListByPagination(entityString, page: number, limit: number): Promise<{ items: T[], total }> {
    const [items, total] = await queryEntityPagination<T>(this.repository, entityString, page, limit, {isDel: 0} as unknown as Partial<T>)
    return {items, total}
  }

  async getAllInfoById(id: number, relateEntityStringList: string[], ){
    const item = await this.repository.findOne({
      where: {id, isDel: 0}  as unknown as FindOptionsWhere<T>,
      relations: relateEntityStringList
    })

    if(!item){
      throw new RequestException('无法根据 id 找到数据')
    }
    console.log('item', item);
    return item
  }

  // 帮助函数
  async findOne(id: number){
    const item = await this.repository.findOne({
      // @ts-ignore
      where: { id, isDel: 0},
    });
    return item
  }

}
