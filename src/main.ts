import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from './configs/logger.config';
import { AllExceptionsFilter } from './exceptions';
import { MailService } from './mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerOptions),
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(3001);
}
bootstrap();
