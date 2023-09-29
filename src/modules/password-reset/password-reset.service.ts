import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { PasswordResetRepository } from './password-reset.repository';
import { PasswordReset } from './entities/password-reset.entity';
import { PasswordResetDto } from './dto/password-reset.dto';
import { createHash } from 'crypto';
import { UserService } from '../user';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly userService: UserService,
    @InjectQueue('reset-password') private readonly resetPasswordQueue: Queue,
  ) {}

  /**
   *
   * @param forgotPassword
   * @returns Promise<Boolean>
   */
  async sendResetPasswordRequest(
    forgotPassword: ForgotPasswordDto,
  ): Promise<Boolean> {
    const { email } = forgotPassword;

    const user = await this.userService.getUserByIdentifier(email);

    // user must not know that the email does not exist
    if (!user) return;

    const resetToken: string =
      await this.passwordResetRepository.savePasswordReset(user);

    await this.resetPasswordQueue.add('forgot_password_requested', {
      to: user.email,
      token: resetToken,
    });

    return true;
  }

  /**
   *
   * @param passwordResetDto
   * @returns Promise<Boolean>
   */
  async resetUserPassword(
    passwordResetDto: PasswordResetDto,
  ): Promise<Boolean> {
    const { resetToken, password } = passwordResetDto;

    // has incoming token
    const userResetToken = createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // get password reset by the incoming token
    const passwordReset: PasswordReset =
      await this.passwordResetRepository.findOneBy({
        resetPasswordToken: userResetToken,
      });

    const currentDate = Date.now();
    const expirationDate = new Date(
      passwordReset.resetPasswordExpire,
    ).getTime();

    if (expirationDate < currentDate || passwordReset.status === 'reset')
      throw new BadRequestException('Reset password request is expired');

    const user: User = await this.userService.getOne({
      id: passwordReset.userId,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    passwordReset.status = 'reset';
    await passwordReset.save();

    return true;
  }
}
