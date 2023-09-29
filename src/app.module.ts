import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  appConfig,
  databaseConfig,
  googleConfig,
  keysConfig,
  mailConfig,
} from './configs';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './database';
import { AllExceptionsFilter } from './exceptions';
import { MailModule } from './mail';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { LogModule } from './modules/log';
import { PasswordResetModule } from './modules/password-reset';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig, keysConfig, googleConfig, mailConfig],
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'error' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmDatabaseModule,
    AuthModule,
    UserModule,
    PasswordResetModule,
    MailModule,
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
