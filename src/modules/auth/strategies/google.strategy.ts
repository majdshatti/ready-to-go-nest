import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGoogleStrategy } from '../interfaces/strategy.interface';
import { User, UserRepository, UserService } from 'src/modules/user';
import { IGoogleUser } from '../interfaces/google-user.interface';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class GoogleStrategy
  extends PassportStrategy(Strategy, 'google')
  implements IGoogleStrategy
{
  constructor(
    protected readonly configService: ConfigService,
    protected readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('google.clientID'),
      clientSecret: configService.get('google.clientSecret'),
      callbackURL: configService.get('google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user: IGoogleUser = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    done(null, user);
  }

  async login(req): Promise<User> {
    const googleUser: IGoogleUser = req.user;

    if (!req.user) throw new BadRequestException('No auth from google');

    let user: User = await this.userService.getUserByIdentifier(
      googleUser.email,
    );

    if (!user) {
      const userDto: RegisterUserDto = {
        email: googleUser.email,
        loginStrategy: 'google',
        username: googleUser.email.split('@')[0],
        password: '',
      };

      user = await this.userService.createUser(userDto);
    }

    return user;
  }
}
