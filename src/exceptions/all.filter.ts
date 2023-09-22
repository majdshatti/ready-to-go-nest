import { InjectQueue } from '@nestjs/bull';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { Queue } from 'bull';
import { IMailError } from 'src/mail/interfaces/error.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @InjectQueue('error') private readonly errorQueue: Queue,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    if (
      exception instanceof InternalServerErrorException &&
      this.configService.get('app.env') === 'production'
    ) {
      const error: IMailError = {
        message: exception.message,
        dateTime: responseBody.timestamp,
        code: httpStatus,
      };

      await this.errorQueue.add(error);
    }

    if (
      this.hasMessageProperty(exception) &&
      this.hasStackProperty(exception)
    ) {
      this.logger.error(exception.message, exception.stack);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  hasMessageProperty(obj: any): obj is { message: string } {
    return typeof obj === 'object' && 'message' in obj;
  }

  hasStackProperty(obj: any): obj is { stack: string } {
    return typeof obj === 'object' && 'stack' in obj;
  }
}
