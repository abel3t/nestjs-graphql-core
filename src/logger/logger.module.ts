import { Module } from '@nestjs/common';

import { LoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [LoggerService, ConfigService],
  exports: [LoggerService]
})
export class LoggerModule {}
