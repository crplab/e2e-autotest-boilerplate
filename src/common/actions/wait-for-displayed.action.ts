export type WaitForDisplayedOptions = {
  reverse?: boolean,
  timeout?: number,
  timeoutMsg?: string
};

export const waitForDisplayedAction = async (
  element: WebdriverIO.Element,
  alias: string,
  options?: WaitForDisplayedOptions
): Promise<void> => {
  options = options || {};

  try {
    await element.waitForDisplayed(options);
  } catch (error) {
    throw new Error(`Error on waiting for display "${alias}"(reverse: ${options.reverse}): ${error}`);
  }
};
