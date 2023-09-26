import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';
import { IMailError } from './interfaces/error.interface';
import { LogService } from 'src/modules/log';

@Processor('error')
export class MailConsumer {
  constructor(
    private readonly mailService: MailService,
    private readonly logService: LogService,
  ) {}

  @Process('internal_error_occurred')
  async sendException(job: Job<IMailError>) {
    const error: IMailError = job.data;

    await this.logService.save({
      message: error.message,
      statusCode: error.code,
      path: error.path,
    });

    await this.mailService.sendException(error);

    return {};
  }
}
