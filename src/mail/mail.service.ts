import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailError } from './interfaces/error.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendException(error: IMailError) {
    await this.mailerService.sendMail({
      to: 'majdshatti8@gmail.com',
      subject: 'Internal Server Error Alert',
      template: './exception',
      context: {
        message: error.message,
        code: error.code,
        dateTime: error.dateTime,
      },
    });
  }
}
