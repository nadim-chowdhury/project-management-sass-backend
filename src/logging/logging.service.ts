import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  constructor(private readonly logger: Logger) {}

  logInfo(message: string) {
    this.logger.log(message);
  }

  logError(message: string, trace: string) {
    this.logger.error(message, trace);
  }
}
