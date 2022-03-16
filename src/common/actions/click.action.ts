export const clickAction = async (element: WebdriverIO.Element, alias: string): Promise<void> => {
  try {
    await element.waitForExist();
    await element.scrollIntoView();
    await element.waitForClickable();
    await element.click();
  } catch (error) {
    throw new Error(`Error on click "${alias}": ${error}`);
  }
};
