import { registerAs } from '@nestjs/config';

/**
 * Registering configurations in the name of database
 *
 */
export default registerAs('app', () => ({
  env: process.env.development,
  name: process.env.tasharuk,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
}));
