import {waitForDisplayedAction, WaitForDisplayedOptions} from "src/common/actions/wait-for-displayed.action";
import {loggerService} from "src/common/log/logger.service";

export abstract class UiComponent {
  protected abstract getRootElement(): Promise<WebdriverIO.Element>

  abstract getAlias(): string

  getSubElementAlias(subElementName: string): string {
    return `${this.getAlias()}: ${subElementName}`;
  }

  protected  async $(value: string): Promise<WebdriverIO.Element> {
    return (await this.getRootElement()).$(value);
  }

  protected async $$(value: string): Promise<WebdriverIO.ElementArray> {
    return (await this.getRootElement()).$$(value);
  }

  async waitForDisplayed(options?: WaitForDisplayedOptions): Promise<void> {
    await waitForDisplayedAction(await this.getRootElement(), this.getAlias(), options);
  }

  async isDisplayed(): Promise<boolean> {
    return isDisplayed(await this.getRootElement());
  }

  async log(message: string): Promise<void> {
    await loggerService.log(`${this.getAlias()}: ${message}`);
  }
}
