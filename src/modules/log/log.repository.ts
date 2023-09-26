import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Log } from './entities/log.entity';

@Injectable()
export class LogRepository extends Repository<Log> {
  constructor(private dataSource: DataSource) {
    super(Log, dataSource.createEntityManager());
  }
}
