import allureReporter from '@wdio/allure-reporter';
import {loggerService} from 'src/common/log/logger.service';
import {StepStatus} from "src/common/qa/types";

export const step = async (title: string, implementation?: Function): Promise<void> => {
    try {
        allureReporter.startStep(title);

        if (!implementation) {
            await loggerService.info('Implementation not specified');
            allureReporter.endStep(StepStatus.BROKEN);
            return;
        }

        await implementation();

        await loggerService.log(`After step "${title}"`, {
            addMessageAttachment: false,
            savePdf: true,
            addBrowserTitle: true,
            addBrowserUrl: true
        });
        allureReporter.endStep(StepStatus.PASSED);
    } catch (error) {
        await loggerService.error(`After error in "${title}"`, {
            addMessageAttachment: false,
            savePdf: true,
            addBrowserTitle: true,
            addBrowserUrl: true
        });
        allureReporter.endStep(StepStatus.FAILED);
        throw error;
    }
}
