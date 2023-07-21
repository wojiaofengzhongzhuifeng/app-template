import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service'
import { ConsumerService } from './consumer.service'
import {BullModule} from "@nestjs/bull";

@Module({
  exports: [ProducerService, ConsumerService],


  imports: [    BullModule.registerQueue({
    name: 'emails',
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),],
  providers: [ProducerService, ConsumerService],
})
export class TaskQueueModule {}
