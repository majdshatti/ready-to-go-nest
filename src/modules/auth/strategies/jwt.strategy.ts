import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from '../interfaces/payload.interface';
import { User, UserService } from 'src/modules/user';
import { IStrategy } from 'src/modules/auth/interfaces/strategy.interface';
import { ICredentials } from '../interfaces/credentials.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

/**
 * JWT Strategy
 *
 * @class
 */
@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy, 'jwt')
  implements IStrategy
{
  /**
   *
   * @param userRepository UserRepository
   */

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('keys.jwt'),
    });
  }

  /**
   * Validates if a user exists by the provided JWT token
   *
   * @param payload IPayload
   * @return Promise<User>
   */
  async validate(payload: IPayload): Promise<User> {
    const { identifier } = payload;

    const user = await this.userService.getUserByIdentifier(identifier);

    if (!user) throw new UnauthorizedException('Invaild token');

    return user;
  }

  /**
   *
   */
  async login(credentials: ICredentials) {
    const { identifier, password } = credentials;

    const user: User = await this.userService.getUserByIdentifier(identifier);

    if (!user) throw new NotFoundException('Invalied Credentials');

    if (!(await bcrypt.compare(password, user.password)))
      throw new NotFoundException('Invalied Credentials');

    const payload: IPayload = { identifier };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
