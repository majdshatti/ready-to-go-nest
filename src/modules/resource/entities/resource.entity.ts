import { Entity, Column } from 'typeorm';
import { ModuleEntity } from 'src/common/entities';

@Entity()
export class Resource extends ModuleEntity {
  @Column()
  name: string;
}
