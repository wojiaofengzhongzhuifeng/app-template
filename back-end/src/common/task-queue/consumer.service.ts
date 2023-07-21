// consumer.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(@InjectQueue('emails') private emailsQueue: Queue) {}

  onModuleInit() {
    this.emailsQueue.process(async (job: Job) => {
      await this.handleJob(job);
    });
  }

  async handleJob(job: Job) {
    const { email, subject, content } = job.data;

    console.log('发送邮件', email, subject, content);
    // Send email...
  }
}
