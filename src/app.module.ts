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
import { MailConsumer, MailModule } from './mail';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { LogModule } from './modules/log';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PolicyModule } from './modules/policy/policy.module';
import { ResourceModule } from './modules/resource';

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
    RoleModule,
    PermissionModule,
    PolicyModule,
    ResourceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    Logger,
    MailConsumer,
  ],
})
export class AppModule {}
