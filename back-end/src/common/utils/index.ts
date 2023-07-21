import {Repository} from "typeorm";
import {saltRounds} from "../constant";
import * as bcrypt from 'bcrypt'

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value) || 'unknown error';
}

export function isEmpty(value) {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  return false;
}



/**
 * typeorm 封装分页方法
 *
 * @param {Object} repositoryObj - typeorm 的 obj
 * @param {string} entityString -
 * @param {number} page - 页码
 * @param {number} limit - 每页数量
 * @param {Object} conditions - 查询条件，选填
 * @returns {Promise}
 */
export async function queryEntityPagination<T>(
  repositoryObj: Repository<T>,
  entityString: string,
  page: number,
  limit: number,
  conditions: Partial<T> = {}
): Promise<[T[], number]> {
  try {
    let query = repositoryObj
      .createQueryBuilder(entityString)
      .skip((page - 1) * limit)
      .take(limit);

    for (const [key, value] of Object.entries(conditions)) {
      query = query.andWhere(`${entityString}.${key} = :${key}`, { [key]: value });
    }

    const response = await query.getManyAndCount();
    return response;
  } catch (error) {
    console.log('请求分页数据出现错误error', error);
    throw error;
  }
}

/**
 * 将字符串保存为经过加密后的字符串
 *
 * @param {string} initString - 原始字符串
 * @returns {Promise<String>>} cryptString
 */
export function generateHashByString(initString){
  return new Promise((resolve, reject)=>{
    bcrypt.hash(initString, saltRounds, function(err, hash) {
      // 在这里，你可以使用 hash 来代替用户的明文密码，存储在数据库中
      if(err) {
        resolve(null)
        console.error(err);
        return;
      }
      console.log(hash); // 这就是加密后的密码
      resolve(hash)
    });

  })
}
