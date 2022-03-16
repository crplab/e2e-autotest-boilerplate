/*
Decorator for function for return to the original url when the function is executed
*/
import {changeUrlAction} from 'src/common/actions/change-url.action';

export const urlTrapDecorator = (fun: Function): Function => {
  return async function () {
    const currentUrl = await browser.getUrl();
    const result = fun(...arguments);
    await changeUrlAction(currentUrl);
    return result;
  };
}
