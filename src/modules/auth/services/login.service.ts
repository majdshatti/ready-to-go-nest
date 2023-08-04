import { Injectable } from '@nestjs/common';
import {
  IGoogleStrategy,
  IJwtStrategy,
} from '../interfaces/strategy.interface';
import { ICredentials } from '../interfaces/credentials.interface';
import { User } from 'src/modules/user';
import { Request } from 'express';

@Injectable()
export class LoginService {
  /**
   * Injecting dependecies
   *
   * @param strategy IAuthStrategy
   */
  constructor(
    private readonly jwtStrategy: IJwtStrategy,
    private readonly googleStrategy: IGoogleStrategy,
  ) {}

  /**
   * Logins user using a jwt strategy
   *
   * @param credentials ICredentials
   * @return Promise<User>
   */
  public async loginJwt(credentials: ICredentials): Promise<User> {
    return await this.jwtStrategy.login(credentials);
  }

  /**
   * Logins user using a google strategy
   *
   * @param request Request
   * @return Promise<User>
   */
  public async loginGoogle(request: Request): Promise<User> {
    return await this.googleStrategy.login(request);
  }
}
