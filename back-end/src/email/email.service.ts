import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import {ProducerService} from "../common/task-queue/producer.service";

@Injectable()
export class EmailService {

  constructor(
    private producerService: ProducerService
  ) {}

  async createSendEmailRequestToTaskQueue(createEmailDto: CreateEmailDto) {
    console.log('createEmailDto', createEmailDto);
    const result = await this.producerService.sendEmail(createEmailDto)
    console.log('将邮件信息推送到队列中', result);
  }

}
