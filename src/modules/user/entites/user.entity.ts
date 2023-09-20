import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ModuleEntity } from 'src/common/entities';
import { ResetPasswordToken } from './reset-password-token.entity';

@Entity()
@Unique(['username', 'email'])
export class User extends ModuleEntity {
  /**
   * Username
   */
  @Column()
  username: string;

  /**
   * Email
   */
  @Column()
  email: string;

  /**
   * Password
   */
  @Column()
  @Exclude()
  password: string;

  /**
   * Login strategy (JWT, Google, ..etc)
   */
  @Column()
  @Exclude({ toPlainOnly: true })
  loginStrategy?: string;

  /**
   *
   */
  @OneToMany(
    () => ResetPasswordToken,
    (resetPasswordToken) => resetPasswordToken.user,
  )
  @Exclude({ toPlainOnly: true })
  passwordResetTokens: ResetPasswordToken[];
}
