import {Repository} from "typeorm";
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
      // @ts-ignore
      // todo 模版 删除这个 ts-ignore 并且不会报错
      where: {id}
    })

    if(!result) throw new RequestException(`根据 id:${id}, 无法找到数据`);

    let newResult = {...result, ...updateDTO}

    const saveResult = await this.repository.save(newResult)

    return saveResult


  }

  async getListByPagination(entityString, page: number, limit: number): Promise<{ items: T[], total }> {
    // todo 解决 isDel
    // @ts-ignore
    const [items, total] = await queryEntityPagination<T>(this.repository, entityString, page, limit, {isDel: 0})
    return {items, total}
  }

  async getAllInfoById(id: number, relateEntityStringList: string[], ){
    const category = await this.repository.findOne({
      // todo isDel 有没有统一管理的地方？
      // @ts-ignore
      // todo 解决这个ignore
      where: {id},
      relations: relateEntityStringList
    })

    if(!category){
      throw new RequestException('无法根据 categoryId 找到数据')
    }
    return category
  }

  // 帮助函数
  async findOne(id: number){
    const category = await this.repository.findOne({
      // @ts-ignore
      where: { id },
    });
    return category
  }

}
