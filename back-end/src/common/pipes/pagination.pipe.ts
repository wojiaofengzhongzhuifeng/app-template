import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import {RequestException} from "../exceptions/request.exception";

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { page, limit } = value;

    // 验证 page 和 limit 是否为数字
    if ((page && isNaN(Number(page))) || (limit && isNaN(Number(limit)))) {
      throw new RequestException('Invalid query parameters: page and limit must be numbers');
    }

    // 转换 page 和 limit 为数字，并设置默认值
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    return { ...value, page: pageNumber, limit: limitNumber };
  }
}
