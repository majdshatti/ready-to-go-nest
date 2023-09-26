import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ModuleEntity } from 'src/common/entities';
import { Permission } from 'src/modules/permission';
import { Role } from 'src/modules/role';

@Entity()
export class Policy extends ModuleEntity {
  @Column()
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.polices)
  @JoinTable({
    name: 'permission_policy',
    joinColumn: { name: 'policy_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission;

  @ManyToMany(() => Role, (role) => role.polices)
  @JoinTable({
    name: 'policy_role',
    joinColumn: { name: 'policy_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role;
}
