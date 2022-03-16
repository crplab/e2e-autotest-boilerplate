import {loggerService} from 'src/common/log/logger.service';

export const changeUrlAction = async (url: string): Promise<void> => {
  await loggerService.log(`Navigate to url "${url}"`);
  await browser.url(url);
  await browser.pause(300);
}
