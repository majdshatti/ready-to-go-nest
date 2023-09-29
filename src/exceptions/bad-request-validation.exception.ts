import { BadRequestException } from '@nestjs/common';
import { IValidationError } from 'src/common/interfaces';

export class ValidationRequestException extends BadRequestException {
  public readonly errors;

  constructor(errors: IValidationError[]) {
    super('Bad Request: Invaild inputs');
    this.errors = errors;
  }
}
