export enum LogLevel {
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    SILENT = 'silent'
}

export enum LogStatus {
    LOG = 'log',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

export const LOG_LEVEL_STATUS_MAP: {
    [id: string]: LogLevel
} = {
    [LogStatus.ERROR]: LogLevel.ERROR,
    [LogStatus.WARN]: LogLevel.WARN,
    [LogStatus.INFO]: LogLevel.INFO,
    [LogStatus.LOG]: LogLevel.DEBUG
};
