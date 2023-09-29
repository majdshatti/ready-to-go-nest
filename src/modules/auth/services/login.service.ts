import { Inject, Injectable } from '@nestjs/common';
import { IStrategy } from '../interfaces/strategy.interface';
import { ICredentials } from '../interfaces/credentials.interface';
import { User } from 'src/modules/user';
import { Request } from 'express';

@Injectable()
export class LoginService {
  /**
   * Injecting dependencies
   *
   * @param strategy IAuthStrategy
   */
  constructor(
    @Inject('GoogleStrategy') private readonly googleStrategy: IStrategy,
    @Inject('JwtStrategy') private readonly jwtStrategy: IStrategy,
  ) {}

  /**
   * Logins user using a jwt strategy
   *
   * @param credentials ICredentials
   * @return Promise<User>
   */
  async loginJwt(credentials: ICredentials): Promise<User> {
    return await this.jwtStrategy.login(credentials);
  }

  /**
   * Logins user using a google strategy
   *
   * @param request Request
   * @return Promise<User>
   */
  async loginGoogle(request: Request): Promise<User> {
    return await this.googleStrategy.login(request);
  }
}
