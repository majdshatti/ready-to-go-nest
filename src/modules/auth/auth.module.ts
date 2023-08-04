import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository, UserService } from '../user';
import { RegisterController } from './controllers/register.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('keys.jwt'),
        signOptions: { expiresIn: 3600 * 60 },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [
    { provide: LoginService, useClass: JwtStrategy },
    { provide: LoginService, useClass: GoogleStrategy },
    UserService,
    UserRepository,
    ConfigService,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
