import {BasePo} from "src/common/pageObjects/base.po";
import {clickAction} from "src/common/actions/click.action";
import {Component} from "src/common/components/component";


export class PageHeaderItemComponent extends Component {
  override getAlias(): string {
    return 'Page Header Item'
  }

  async getNumberText(): Promise<string> {
    const numberElement = (await this.$$('span'))[0];
    return await numberElement.getText();
  }

  async getName(): Promise<string> {
    const nameElement = (await this.$$('span'))[1];
    return await nameElement.getText();
  }

  async click(): Promise<void> {
    await this.log(`Click "${this.getAlias()}"`);
    await clickAction(await this.getRootElement(), this.getAlias());
  }
}
