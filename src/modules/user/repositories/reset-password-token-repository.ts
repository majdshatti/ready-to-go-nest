import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ResetPasswordToken } from '../entities/reset-password-token.entity';
import { v4 as uuid } from 'uuid';
import { User } from '../entities/user.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class ResetPasswordTokenRepository extends Repository<ResetPasswordToken> {
  constructor(private dataSource: DataSource) {
    super(ResetPasswordToken, dataSource.createEntityManager());
  }

  /**
   *
   */
  async saveResetPasswordToken(user: User): Promise<ResetPasswordToken> {
    const resetPasswordToken = new ResetPasswordToken();

    resetPasswordToken._id = uuid();
    resetPasswordToken.resetPasswordToken = randomBytes(20).toString('hex');
    resetPasswordToken.resetPasswordExpire = '';
    resetPasswordToken.userId = user.id;

    return await resetPasswordToken.save();
  }
}
