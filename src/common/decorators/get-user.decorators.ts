import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user';

/**
 * Getting the user from the request
 *
 * @param data any data could be passed to the costum decorator
 * @param ctx ExecutionContext
 *
 * @returns User: user with an authorized access
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
