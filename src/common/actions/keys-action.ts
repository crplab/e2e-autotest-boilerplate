import {loggerService} from "src/common/log/logger.service";

export const keysAction = async (keys: string | string[]): Promise<void> => {
  await loggerService.log(`Pressing characters "${keys}"`);
  await browser.keys(keys);
}
