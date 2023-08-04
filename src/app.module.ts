import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig, googleConfig, keysConfig } from './configs';
import { TypeOrmDatabaseModule } from './database';
import mailConfig from './configs/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig, keysConfig, googleConfig, mailConfig],
    }),
    TypeOrmDatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
