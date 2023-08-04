import {
  BaseEntity,
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['_id'])
export class ModuleEntity extends BaseEntity {
  /**
   * ID
   *
   * private key, only used for the database, and its excluded from the response
   */
  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  /**
   * UUID (universal global id)
   *
   * public key, the user should only see the public key
   */
  @Column()
  _id: string;

  /**
   * Creation Date
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  /**
   * Update Date
   *
   */
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
