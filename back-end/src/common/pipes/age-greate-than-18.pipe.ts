import {PipeTransform} from "@nestjs/common";
import {RequestException} from "../exceptions/request.exception";

export class AgeGreateThan18Pipe implements PipeTransform {
  transform(value: number): number {
    if (value < 18) {
      throw new RequestException('年龄必须大于18');
    }
    return value;
  }
}
