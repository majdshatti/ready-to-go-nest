import { Injectable, BadRequestException } from '@nestjs/common';
import { User, UserService } from 'src/modules/user';
import { randomBytes } from 'crypto';

@Injectable()
export class PasswordService {
  /**
   * Injecting dependecies
   *
   */
  constructor(private readonly userService: UserService) {}

  /**
   *
   */
  public async validateUser(email: string): Promise<User> {
    const user: User = await this.userService.getUserByIdentifier(email);

    if (!user) throw new BadRequestException('Invalid email');

    return user;
  }
}
