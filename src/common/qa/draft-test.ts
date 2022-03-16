import {step} from "src/common/qa/step";
import {AppConfigService} from "src/common/services/app-config.service";

export const draftTest = async (): Promise<void> => {
  await step('Draft');

  const appConfigService = new AppConfigService();

  if (appConfigService.getConfig().THROW_ERROR_FOR_DRAFT_TEST) {
    throw new Error('Draft');
  }
}
