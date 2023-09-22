import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';
import { IMailError } from './interfaces/error.interface';

@Processor('mail')
export class MailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('internal_error_occurred')
  async sendMail(job: Job<IMailError>) {
    const mailData: IMailError = job.data;

    await this.mailService.sendException(mailData);

    return {};
  }
}
