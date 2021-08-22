import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

enum ELogLevel {
  debug,
  info,
  warn,
  error
}

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(
    private readonly _context?: string,
    private readonly configService?: ConfigService
  ) {
    super(_context);
  }

  public log(message: unknown, context?: string): void {
    if (this.isValidLevel(ELogLevel.debug)) {
      Logger.log(JSON.stringify(message), context || this._context);
    }
  }

  public info(message: unknown, context?: string): void {
    if (this.isValidLevel(ELogLevel.info)) {
      Logger.log(JSON.stringify(message), context || this._context);
    }
  }

  public warn(message: unknown, context?: string): void {
    if (this.isValidLevel(ELogLevel.warn)) {
      Logger.warn(JSON.stringify(message), context || this._context);
    }
  }

  public error(message: unknown, trace?: string, context?: string): void {
    if (this.isValidLevel(ELogLevel.error)) {
      Logger.error(JSON.stringify(message), trace, context || this._context);
    }
  }

  private isValidLevel(level: ELogLevel): boolean {
    const logSettings = this.configService.get<ILogSettings>('LoggerSettings');

    return level >= ELogLevel[logSettings.level];
  }
}
