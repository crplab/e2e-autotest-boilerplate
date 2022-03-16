export const scrollIntoViewAction = async (element: WebdriverIO.Element, alias: string): Promise<void> => {
  try {
    await element.waitForExist();
    await element.scrollIntoView();
  } catch (error) {
    throw new Error(`Error on scrolling to "${alias}": ${error}`);
  }
};
