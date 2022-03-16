export const getElementParentWithGivenSelector = async (
  element: WebdriverIO.Element,
  targetSelector: string,
  parentAlias: string
): Promise<WebdriverIO.Element> => {
  try {
    let parent = await element.$('..');
    const targetElements = await browser.$$(targetSelector);

    while (await parent.isExisting()) {
      const lookup = targetElements.find((element: WebdriverIO.Element) => {
        return ((element === parent) || (element.elementId === parent.elementId))
      });

      if (lookup) {
        return parent;
      }

      parent = await parent.$('..');
    }
  } catch (error) {
    throw new Error(`Error on search parent element "${parentAlias}": ${error}`);
  }

  throw new Error(`Parent "${parentAlias}" not found`);
}
