import { Controller, Post, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { IResponse } from 'src/common/interfaces';
import { formatResponse } from 'src/utils';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { ApiTags } from '@nestjs/swagger';
import { PasswordResetService } from './password-reset.service';

/**
 * @class PasswordResetController
 * Responsible for handling forgot and reset password
 */
@ApiTags('Password')
@Controller('password')
export class PasswordResetController {
  /**
   * Injecting dependencies
   *
   * @param passwordResetService PasswordResetService
   */
  constructor(private readonly passwordResetService: PasswordResetService) {}

  /**
   * sends a request to reset password via mail
   *
   * @param forgotPasswordDto ForgotPasswordDto
   * @return Promise<IResponse>
   */
  @Post('forgot')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResponse> {
    await this.passwordResetService.sendResetPasswordRequest(forgotPasswordDto);

    return formatResponse(HttpStatus.OK, 'mail sent to user');
  }

  /**
   * resets the password of a user
   *
   * @param resetPasswordDto PasswordResetDto
   * @returns Promise<IResponse>
   */
  @Post('reset')
  async resetPassword(
    @Body() resetPasswordDto: PasswordResetDto,
  ): Promise<IResponse> {
    await this.passwordResetService.resetUserPassword(resetPasswordDto);

    return formatResponse(HttpStatus.OK, 'password reset successfully');
  }
}
