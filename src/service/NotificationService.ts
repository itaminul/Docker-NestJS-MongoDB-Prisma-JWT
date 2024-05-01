import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from './EmailService';
import { User } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: EmailService) {}

  @Cron('* * 0 * * *', {
    name: 'notifications',
    timeZone: 'Asia/Dhaka', // Set the time zone to Bangladesh
  })

  async sendNotificationEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      // Send notification email using the email service
      await this.emailService.sendEmail(to, subject, text);
      console.log('Notification email sent successfully');
    } catch (error) {
      console.error('Error sending notification email:', error);
      throw new Error('Failed to send notification email');
    }
  }


}
