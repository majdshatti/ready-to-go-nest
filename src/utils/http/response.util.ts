import { HttpStatus } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces';

export function formatResponse(
  status: HttpStatus,
  message: string,
  data?: any,
): IResponse {
  return { status, message, data };
}
