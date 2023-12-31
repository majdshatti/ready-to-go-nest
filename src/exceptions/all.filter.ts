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
import { ValidationRequestException } from './bad-request-validation.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @InjectQueue('error') private readonly errorQueue: Queue,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  /**
   * @param exception unknown
   * @param host ArgumentsHost
   */
  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = this.getStatusCode(exception);
    const message = this.getExceptionMessage(exception);
    const exceptionError: Object = this.getExceptionError(exception);

    const responseBody = {
      status: httpStatus,
      message,
      errors: exceptionError,
    };

    // log errors using the file transport
    if (this.hasMessageProperty(exception))
      this.logger.error(
        exception.message,
        this.hasStackProperty(exception) ? exception.stack : null,
      );

    // send mail when an internal server error occurs
    if (
      exception instanceof InternalServerErrorException &&
      this.configService.get('app.env') === 'production'
    ) {
      const error: IMailError = {
        message: exception.message,
        dateTime: new Date().toISOString(),
        code: httpStatus,
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };

      // send mail via bull queue
      await this.errorQueue.add('internal_error_occurred', error);
    } else {
      // Log to cli for more user exp
      console.log(exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  /**
   * returns status code
   *
   * @param exception
   * @returns number statusCode
   */
  private getStatusCode(exception: unknown) {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * returns exception message
   *
   * @param exception
   * @returns message string
   */
  private getExceptionMessage(exception: unknown) {
    return exception instanceof HttpException
      ? exception.message
      : 'Internal Server Error';
  }

  /**
   * returns validation errors object
   *
   * @param exception
   * @returns Object
   */
  private getExceptionError = (exception: unknown): Object => {
    return exception instanceof ValidationRequestException
      ? exception.errors
      : {};
  };

  /**
   * checks if message property exists in exception
   *
   * @param obj any exception
   * @return boolean
   */
  hasMessageProperty(obj: any): obj is { message: string } {
    return typeof obj === 'object' && 'message' in obj;
  }

  /**
   * checks if stack property exists in exception
   *
   * @param obj any exception
   * @return boolean
   */
  hasStackProperty(obj: any): obj is { stack: string } {
    return typeof obj === 'object' && 'stack' in obj;
  }
}
