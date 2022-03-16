import {loggerService} from "src/common/log/logger.service";

export const pauseAction = async (timeMs: number = 300, message: string): Promise<void> => {
  await loggerService.log(message);
  await browser.pause(timeMs);
}
