import {
  Entity,
  Column,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ModuleEntity } from 'src/common/entities';
import { ResetPasswordToken } from './reset-password-token.entity';
import { Role } from 'src/modules/role';

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

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'role_user',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role;
}
