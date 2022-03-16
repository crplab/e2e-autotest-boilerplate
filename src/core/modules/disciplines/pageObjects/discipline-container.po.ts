import {BasePo} from "src/common/pageObjects/base.po";
import {waitForDisplayedAction} from "src/common/actions/wait-for-displayed.action";
import {Discipline} from "src/core/modules/disciplines/types/discipline";
import {DISCIPLINE_CONTAINER_TITLE} from "src/core/modules/disciplines/constants/discipline-container-title";


export class DisciplinesContainerPo extends BasePo {
  getRootElement(): Promise<WebdriverIO.Element> {
    return browser.$('.ui-discipline-container');
  }

  getAlias(): string {
    return 'Disciplines Navigation'
  }

  async getTitle(): Promise<string> {
    const titleElement = await this.$('.section-item-title');
    return await titleElement.getText();
  }

  async getContentText(): Promise<string> {
    const contentTextElement = await this.$('.section-item-body');
    return await contentTextElement.getText();
  }

  async waitOpenDiscipline(discipline: Discipline): Promise<void> {
    await waitForDisplayedAction(
      await this.$(`.section-item-title*=${DISCIPLINE_CONTAINER_TITLE[discipline]}`),
      this.getSubElementAlias(`Title "${discipline}"`)
    );
  }
}

export const disciplinesContainerPo = new DisciplinesContainerPo();
