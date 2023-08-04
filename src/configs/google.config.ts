import { registerAs } from '@nestjs/config';

/**
 * Registering configurations in the name of database
 *
 */
export default registerAs('google', () => ({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: process.env['GOOGLE_CALLBACK_URL'],
}));
