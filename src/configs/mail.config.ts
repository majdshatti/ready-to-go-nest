import { registerAs } from '@nestjs/config';

/**
 * Registering configurations in the name of database
 *
 */
export default registerAs('mail', () => ({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  from: process.env.MAILER_FROM,
  username: process.env.MAILER_USERNAME,
  password: process.env.MAILER_PASSWORD,
}));
