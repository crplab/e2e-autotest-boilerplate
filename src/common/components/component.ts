import {UiComponent} from "src/common/types/ui-component";

export abstract class Component extends UiComponent {
  private readonly rootElement: WebdriverIO.Element;

  protected constructor(element: WebdriverIO.Element) {
    super();
    this.rootElement = element;
  }

  protected override async getRootElement(): Promise<WebdriverIO.Element> {
    return this.rootElement;
  }
}
