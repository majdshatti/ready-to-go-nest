import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from '../mail.service';
import { IMailError } from '../interfaces/error.interface';
import { IMailResetPassword } from '../interfaces/reset-password.interface';

@Processor('reset-password')
export class ResetPasswordMailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('forgot_password_requested')
  async sendException(job: Job<IMailResetPassword>) {
    const resetPasswordData: IMailResetPassword = job.data;

    await this.mailService.sendResetPasswordRequest(resetPasswordData);

    return {};
  }
}
