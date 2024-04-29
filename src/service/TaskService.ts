import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleEvery10Minutes() {
    console.log('Task executed every 10 seconds');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 30');
  }
}