import {LogLevel} from 'src/common/log/constants';

const dotenv = require('dotenv');

export interface AppConfig {
  LOG_LEVEL: LogLevel,
  THROW_ERROR_FOR_DRAFT_TEST: boolean,
  TESTED_ENVIRONMENT: string
}

let appConfig;

export class AppConfigService {
  getConfig(): AppConfig {
    if (!appConfig) {
      const dotenvConfig = dotenv.config();
      const envConfig: any = dotenvConfig.error ? {} : dotenvConfig.parsed;

      if (dotenvConfig.error) {
        console.warn('ConfigService: Can`t get .env config');
      }

      appConfig = Object.freeze({
        LOG_LEVEL: <LogLevel>envConfig.LOG_LEVEL || LogLevel.TRACE,
        THROW_ERROR_FOR_DRAFT_TEST: (envConfig.THROW_ERROR_FOR_DRAFT_TEST === 'true'),
        TESTED_ENVIRONMENT: envConfig.TESTED_ENVIRONMENT || ''
      });
    }

    return appConfig;
  }
}
