import {BasePo} from "src/common/pageObjects/base.po";
import {clickAction} from "src/common/actions/click.action";
import {Discipline} from "src/core/modules/disciplines/types/discipline";
import {DISCIPLINE_NAME} from "src/core/modules/disciplines/constants/discipline-name";
import {waitForDisplayedAction} from "src/common/actions/wait-for-displayed.action";


export class DisciplinesNavigationPo extends BasePo {
  getRootElement(): Promise<WebdriverIO.Element> {
    return browser.$('#disciplines .section-menu.fx-row');
  }

  getAlias(): string {
    return 'Disciplines Navigation'
  }

  async getItemTextArray(): Promise<string[]> {
    const itemBodyElements = await this.$$('.item-body');
    return await Promise.all(itemBodyElements.map((itemBodyElement: WebdriverIO.Element) => itemBodyElement.getText()));
  }

  async clickItem(discipline: Discipline): Promise<void> {
    await this.log(`Click item "${discipline}"`);
    await clickAction(await this.$(`.item-body=${DISCIPLINE_NAME[discipline]}`), this.getSubElementAlias('Item'));
  }

  async waitForDisplayDiscipline(discipline: Discipline): Promise<void> {
    await waitForDisplayedAction(await this.$(`.item-body=${DISCIPLINE_NAME[discipline]}`), this.getSubElementAlias('Item'));
  }
}

export const disciplinesNavigationPo = new DisciplinesNavigationPo();
