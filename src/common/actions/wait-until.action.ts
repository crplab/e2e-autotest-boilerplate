export type WaitUntilOptions = {
  timeoutMsg?: string,
  timeout?: number
};

export const waitUntilAction = async (comparatorFunction: () => boolean | Promise<boolean>, options?: WaitUntilOptions): Promise<void> => {
  await browser.waitUntil(comparatorFunction, options);
}
