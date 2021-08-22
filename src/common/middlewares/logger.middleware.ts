import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

import { LoggerService } from '../../logger/logger.service';
import {
  getIp,
  getMethod,
  getOrigin,
  getReferrer,
  getUrl,
  getUserAgent
} from '../helpers/req.helper';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService
  ) {}

  public use(req: Request, res: Response, next: NextFunction): unknown {
    const settings: ILogSettings = this.configService.get('LoggerSettings');

    const operation: string =
      req.body && req.body.operationName ? req.body.operationName : '';
    const action: string = getUrl(req).split('/')[1];

    if (
      settings.silence.includes(action) ||
      settings.silence.includes(operation)
    ) {
      return next();
    }

    const startTime = process.hrtime();

    req.on('error', (error: Error) => {
      this.logMethodByStatus(error.message, error.stack, req.statusCode);
    });

    res.on('error', (error: Error) => {
      this.logMethodByStatus(error.message, error.stack, res.statusCode);
    });

    res.on('finish', () => {
      const diff = process.hrtime(startTime);

      const message = {
        url: `${getMethod(req)} ${getUrl(req)}`,
        referrer: getReferrer(req),
        origin: getOrigin(req) || '-',
        userAgent: getUserAgent(req),
        remoteAddress: getIp(req),
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        requestRunTime: `${(diff[0] * 1e3 + diff[1] * 1e-6).toFixed(4)} ms`
      };

      this.logMethodByStatus(message, '', res.statusCode);
    });

    return next();
  }

  private logMethodByStatus(message: unknown, stack: string, statusCode = 500) {
    const prefix = 'LoggerMiddleware';
    if (statusCode < 300) {
      return this.logger.info(message, prefix);
    } else if (statusCode < 400) {
      return this.logger.warn(message, prefix);
    } else {
      return this.logger.error(message, stack, prefix);
    }
  }
}
