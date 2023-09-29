import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PasswordReset } from './entities/password-reset.entity';
import { v4 as uuid } from 'uuid';
import { User } from '../user/entities/user.entity';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class PasswordResetRepository extends Repository<PasswordReset> {
  constructor(private dataSource: DataSource) {
    super(PasswordReset, dataSource.createEntityManager());
  }

  /**
   *
   */
  async savePasswordReset(user: User): Promise<string> {
    const resetPassword = new PasswordReset();
    const resetToken = randomBytes(20).toString('hex');

    resetPassword._id = uuid();
    resetPassword.resetPasswordToken = createHash('sha256')
      .update(resetToken)
      .digest('hex');
    resetPassword.resetPasswordExpire = '' + Date.now() + 10 * 60 * 1000;
    resetPassword.userId = user.id;
    resetPassword.status = 'initiated';

    await resetPassword.save();

    return resetToken;
  }
}
