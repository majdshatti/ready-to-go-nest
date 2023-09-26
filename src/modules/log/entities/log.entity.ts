import { Entity, Column } from 'typeorm';
import { ModuleEntity } from 'src/common/entities';

@Entity()
export class Log extends ModuleEntity {
  /**
   * StatusCode
   */
  @Column()
  statusCode: number;

  /**
   * Message
   */
  @Column()
  message: string;

  /**
   * Path
   */
  @Column()
  path?: string;
}
