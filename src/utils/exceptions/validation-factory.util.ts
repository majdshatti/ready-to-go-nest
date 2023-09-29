import { ValidationError } from 'class-validator';

import { ValidationRequestException } from 'src/exceptions';
import { IValidationError } from 'src/common/interfaces';

/**
 * Form a custom object that contains a list of validation errors
 *
 * @param validationErrors
 * @returns ValidationRequestException
 */
export const exceptionFactory = (validationErrors: ValidationError[] = []) => {
  let errors: IValidationError[] = [];

  for (const valError of validationErrors) {
    errors.push({
      value: valError.value,
      property: valError.property,
      message: valError.constraints,
    });
  }

  return new ValidationRequestException(errors);
};
