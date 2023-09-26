import { Injectable } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  async save(createLogDto: CreateLogDto) {
    const log = new Log();

    log.statusCode = createLogDto.statusCode;
    log.message = createLogDto.message;
    log.path = createLogDto.path;

    return await this.logRepository.save(log);
  }
}
