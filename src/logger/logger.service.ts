import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(private readonly _context?: string) {
    super(_context);
  }

  public log(message: unknown, context?: string): void {
    Logger.log(JSON.stringify(message), context || this._context);
  }

  public info(message: unknown, context?: string): void {
    Logger.log(JSON.stringify(message), context || this._context);
  }

  public warn(message: unknown, context?: string): void {
    Logger.warn(JSON.stringify(message), context || this._context);
  }

  public error(message: unknown, trace?: string, context?: string): void {
    Logger.error(JSON.stringify(message), trace, context || this._context);
  }
}
