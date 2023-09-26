import {
  BaseEntity,
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';

@Unique(['_id'])
export abstract class ModuleEntity extends BaseEntity {
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

  /**
   * Add uuid value before insert
   */
  @BeforeInsert()
  setUuidValue() {
    this._id = uuid();
  }
}
