import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ModuleEntity } from 'src/common/entities';
import { PasswordReset } from 'src/modules/password-reset/entities/password-reset.entity';
import { userTypes } from 'src/common/types';

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
   * Could be admin/end-user
   */
  @Column()
  @Exclude({ toPlainOnly: true })
  type: userTypes;

  /**
   * Login strategy (JWT, Google, ..etc)
   */
  @Column()
  @Exclude({ toPlainOnly: true })
  loginStrategy?: string;

  /**
   *
   */
  @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
  @Exclude({ toPlainOnly: true })
  passwordResets: PasswordReset[];
}
