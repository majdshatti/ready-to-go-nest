import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig, googleConfig, keysConfig } from './configs';
import { TypeOrmDatabaseModule } from './database';
import { MailModule } from './mail/mail.module';
import mailConfig from './configs/mail.config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exceptions';
import { BullModule } from '@nestjs/bull';
import { LogModule } from './modules/log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig, keysConfig, googleConfig, mailConfig],
    }),
    TypeOrmDatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'error' }),
    LogModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    Logger,
  ],
})
export class AppModule {}
