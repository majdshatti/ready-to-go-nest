import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogRepository } from './log.repository';

@Module({
  controllers: [LogController],
  providers: [LogService, LogRepository],
  exports: [LogService],
})
export class LogModule {}
