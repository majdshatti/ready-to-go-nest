import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/modules/user';
import { RegisterUserDto } from '../dto/register-user.dto';
import { formatResponse } from 'src/utils';
import { IResponse } from 'src/common/interfaces';

@Controller('register')
export class RegisterController {
  constructor(private readonly userService: UserService) {}

  /**
   * Saves a user into the db
   *
   * @param RegisterUserDto dto
   * @returns Promise<IResponse>
   */
  @Post('/')
  async register(@Body() dto: RegisterUserDto): Promise<IResponse> {
    return formatResponse(
      HttpStatus.CREATED,
      'user registered successfully',
      await this.userService.createUser(dto),
    );
  }
}
