// producer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {CreateEmailDto} from "../../email/dto/create-email.dto";

@Injectable()
export class ProducerService {
  constructor(@InjectQueue('emails') private emailsQueue: Queue) {}

  async sendEmail(sendEmailDTO: CreateEmailDto) {
    await this.emailsQueue.add(sendEmailDTO);
  }
}
