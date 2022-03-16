import {checkLogLevel} from 'src/common/log/check-log-level';
import {LOG_LEVEL_STATUS_MAP, LogStatus} from 'src/common/log/constants';
import AllureReporter from '@wdio/allure-reporter';

type WriteLogOptions = {
    addMessageAttachment?: boolean,
    savePdf?: boolean,
    addBrowserTitle?: boolean,
    addBrowserUrl?: boolean
}

export class LoggerService {
    constructor(public logName: string = 'Logger') {
    }

    async log(message: string, options?: WriteLogOptions): Promise<void> {
        await this.writeLog(message, LogStatus.LOG, options);
    }

    async info(message: string, options?: WriteLogOptions): Promise<void> {
        await this.writeLog(message, LogStatus.INFO, options);
    }

    async warn(message: string, options?: WriteLogOptions): Promise<void> {
        await this.writeLog(message, LogStatus.WARN, options);
    }

    async error(message: string, options?: WriteLogOptions): Promise<void> {
        await this.writeLog(message, LogStatus.ERROR, options);
    }

    private async writeLog(message: string, status: LogStatus, options?: WriteLogOptions): Promise<void> {
        options = options || {};
        options.addMessageAttachment = (options.addMessageAttachment !== false);

        switch (status) {
            case LogStatus.ERROR:
                console.error(this.preprocessMessage(message));
                break;
            case LogStatus.WARN:
                console.warn(this.preprocessMessage(message));
                break;
            case LogStatus.INFO:
                console.info(this.preprocessMessage(message));
                break;
            case LogStatus.LOG:
                console.log(this.preprocessMessage(message));
                break;
        }

        if (checkLogLevel(LOG_LEVEL_STATUS_MAP[status])) {
            options.addMessageAttachment && this.addAttachment(`Log message: ${message}`, message);
            options.savePdf && await this.savePdf();
            options.addBrowserTitle && this.addAttachment('Browser tab title', await browser.getTitle());
            options.addBrowserUrl && this.addAttachment('URL', await browser.getUrl());
        }
    }

    async savePdf(): Promise<void> {
        await browser.saveScreenshot(`_results_/allure-raw/screenshot-${new Date()}.png`);
    }

    addAttachment(name: string, content: string | object | Buffer, type: string = 'text/plain'): void {
        AllureReporter.addAttachment(name, content, type);
    }

    private preprocessMessage(message: string): string {
        return `${this.logName}: ${message}`;
    }
}

export const loggerService = new LoggerService();
