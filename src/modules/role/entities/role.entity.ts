import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ModuleEntity } from 'src/common/entities';
import { Policy } from 'src/modules/policy';
import { User } from 'src/modules/user';

@Entity()
export class Role extends ModuleEntity {
  @Column()
  name: string;

  @ManyToMany(() => Policy, (policy) => policy.roles)
  @JoinTable({
    name: 'policy_role',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'policy_id', referencedColumnName: 'id' },
  })
  polices: Policy;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: 'role_user',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User;
}
