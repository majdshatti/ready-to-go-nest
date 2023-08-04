import { registerAs } from '@nestjs/config';

/**
 * Registering configurations in the name of keys
 *
 */
export default registerAs('keys', () => ({
  jwt: process.env.JWT_SECRET_KEY,
}));
