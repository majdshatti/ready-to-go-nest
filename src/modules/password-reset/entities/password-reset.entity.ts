import { Exclude } from 'class-transformer';
import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ModuleEntity } from 'src/common/entities';
import { User } from '../../user/entities/user.entity';
import { PasswordResetStatus } from '../types/password-status.type';

@Entity()
export class PasswordReset extends ModuleEntity {
  /**
   * Reset Password token
   */
  @Column()
  @Exclude()
  resetPasswordToken: string;

  /**
   * Reset Token Expiration Date
   */
  @Column()
  @Exclude()
  resetPasswordExpire: string;

  /**
   *
   */
  @Column()
  status: PasswordResetStatus;

  /**
   *
   */
  @Column()
  @Exclude()
  userId: number;

  /**
   *
   */
  @ManyToOne(() => User, (user) => user.passwordResets)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
