import { User } from 'src/modules/user';
import { IPayload } from './payload.interface';
import { ICredentials } from './credentials.interface';
import { VerifyCallback } from 'passport-google-oauth20';
import { Request } from 'express';

export interface IJwtStrategy {
  validate(payload: IPayload);
  login(credentials: ICredentials);
}

export interface IGoogleStrategy {
  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  );

  login(request: Request);
}
