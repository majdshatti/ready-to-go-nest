import { registerAs } from '@nestjs/config';

/**
 * Registering configurations in the name of database
 *
 */
export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  engine: process.env.DB_HOST,
  synchronize: process.env.APP_ENV === 'development' ? true : false,
}));
