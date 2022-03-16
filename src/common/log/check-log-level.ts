import {LogLevel} from 'src/common/log/constants';
import {AppConfigService} from 'src/common/services/app-config.service';

const LOG_LEVEL_VALUE = {
    [LogLevel.TRACE]: 5,
    [LogLevel.DEBUG]: 4,
    [LogLevel.INFO]: 3,
    [LogLevel.WARN]: 2,
    [LogLevel.ERROR]: 1,
    [LogLevel.SILENT]: 0
}

export const checkLogLevel = (logLevel: LogLevel): boolean => {
    const config = new AppConfigService().getConfig();
    return (LOG_LEVEL_VALUE[config.LOG_LEVEL] >= LOG_LEVEL_VALUE[logLevel]);
};
