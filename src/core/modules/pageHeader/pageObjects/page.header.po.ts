import {BasePo} from "src/common/pageObjects/base.po";
import {getElementParentWithGivenSelector} from "src/common/utils/get-element-parent-with-given-selector";
import {PageHeaderItemComponent} from "src/core/modules/pageHeader/components/page.header.item.component";


export enum PageHeaderItem {
  PULSE = 'PULSE',
  DISCIPLINES = 'DISCIPLINES',
  PROJECTS = 'PROJECTS',
  PARTNERS = 'PARTNERS',
  CONTACTS = 'CONTACTS',
}

export const PAGE_HEADER_ITEM_NAME = {
  [PageHeaderItem.PULSE]: 'Pulse',
  [PageHeaderItem.DISCIPLINES]: 'Disciplines',
  [PageHeaderItem.PROJECTS]: 'Projects',
  [PageHeaderItem.PARTNERS]: 'Partners',
  [PageHeaderItem.CONTACTS]: 'Contacts',
}

export class PageHeaderPo extends BasePo {
  override getRootElement(): Promise<WebdriverIO.Element> {
    return browser.$('.ui-header');
  }

  override getAlias(): string {
    return 'Page Header'
  }

  async clickItem(item: PageHeaderItem): Promise<void> {
    await this.log(`Click "${item}" item`);

    const itemElement = await getElementParentWithGivenSelector(
      await this.$(`span=${PAGE_HEADER_ITEM_NAME[item]}`),
      '.menu-item',
      this.getSubElementAlias('Item')
    );

    const itemComponent = new PageHeaderItemComponent(itemElement);
    await itemComponent.click();
  }
}

export const pageHeaderPo = new PageHeaderPo();
