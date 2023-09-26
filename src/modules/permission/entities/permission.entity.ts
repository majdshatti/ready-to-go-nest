import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ModuleEntity } from 'src/common/entities';
import { Policy } from 'src/modules/policy';
import { Role } from 'src/modules/role';
import { Resource } from 'src/modules/resource';

@Entity()
export class Permission extends ModuleEntity {
  @Column()
  action: string;

  @ManyToMany(() => Policy, (policy) => policy.permissions)
  @JoinTable({
    name: 'permission_policy',
    joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'policy_id', referencedColumnName: 'id' },
  })
  polices: Policy;
}
