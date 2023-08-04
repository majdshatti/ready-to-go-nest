import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { LoginService } from '../services/login.service';
import { JWTLoginDto } from '../dto/jwt-login.dto';
import { ICredentials } from '../interfaces/credentials.interface';
import { AuthGuard } from '@nestjs/passport';
import { IResponse } from 'src/interfaces';
import { formatResponse } from 'src/utils';
import { Request } from 'express';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { PasswordService } from '../services/password.service';
import {
  ResetPasswordToken,
  ResetPasswordTokenService,
  UserService,
} from 'src/modules/user';

/**
 * @class PasswordController
 *
 * Responsible for handling forgot and reset password
 */
@Controller('password')
export class PasswordController {
  /**
   * Injecting dependencies
   *
   */
  constructor(
    private readonly resetPasswordTokenService: ResetPasswordTokenService,
    private readonly userService: UserService,
  ) {}

  /**
   *
   */
  @Post('forgot')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResponse> {
    const { email } = forgotPasswordDto;

    const user = await this.userService.getUserByIdentifier(email);

    // TODO must not throw an error for the user to not know that the email is invalid
    if (!user) throw new NotFoundException('Invalid creds');

    const resetPasswordToken: ResetPasswordToken =
      await this.resetPasswordTokenService.createResetPasswordToken(user);

    // TODO Orginize tables
    // TODO Reinstall nodemailer
    // TODO Complete sending email

    return formatResponse(HttpStatus.OK, 'sent email to user');
  }
}
