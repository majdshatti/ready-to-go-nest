import { User } from 'src/modules/user';
import { IPayload } from './payload.interface';
import { ICredentials } from './credentials.interface';
import { VerifyCallback } from 'passport-google-oauth20';
import { Request } from 'express';

export interface IStrategy {
  login(obj: ICredentials | Request);
  validate(...args: any[]);
}
