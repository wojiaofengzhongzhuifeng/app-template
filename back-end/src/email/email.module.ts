import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import {TaskQueueModule} from "../common/task-queue/task-queue.module";

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [TaskQueueModule]
})
export class EmailModule {}
