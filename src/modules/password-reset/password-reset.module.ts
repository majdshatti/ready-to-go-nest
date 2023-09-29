import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetRepository } from './password-reset.repository';
import { PasswordResetController } from './password-reset.controller';
import { BullModule } from '@nestjs/bull';
import { UserModule } from '../user';
import { MailModule, ResetPasswordMailConsumer } from 'src/mail';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'reset-password' }),
    UserModule,
    MailModule,
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, PasswordResetRepository],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
