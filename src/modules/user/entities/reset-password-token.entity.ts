import { Exclude } from 'class-transformer';
import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ModuleEntity } from 'src/common/entities';
import { User } from './user.entity';

@Entity()
export class ResetPasswordToken extends ModuleEntity {
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
  @Exclude()
  userId: number;

  /**
   *
   */
  @ManyToOne(() => User, (user) => user.passwordResetTokens)
  @JoinColumn({ name: 'userId' })
  user: User;
}
