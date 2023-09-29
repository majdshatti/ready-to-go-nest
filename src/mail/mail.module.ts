import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorMailConsumer } from './consumers/error.consumer';
import { ResetPasswordMailConsumer } from './consumers/reset-password.consumer';
import { LogModule } from 'src/modules/log';

@Module({
  imports: [
    LogModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('mail.host'),
          secure: false,
          auth: {
            user: config.get('mail.username'),
            pass: config.get('mail.password'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('mail.from')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, ErrorMailConsumer, ResetPasswordMailConsumer],
  exports: [MailService, ErrorMailConsumer, ResetPasswordMailConsumer],
})
export class MailModule {}
