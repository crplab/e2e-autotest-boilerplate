import {Discipline} from "src/core/modules/disciplines/types/discipline";
import {urlTrapDecorator} from "src/common/utils/url-trap-decorator";
import {disciplinesNavigationPo} from "src/core/modules/disciplines/pageObjects/disciplines-navigation.po";
import {PageHeaderItem, pageHeaderPo} from "src/core/modules/pageHeader/pageObjects/page.header.po";

export const hasDisciplineCheck = async (discipline: Discipline): Promise<void> => {
  const urlTrapFun = urlTrapDecorator(async (): Promise<void> => {
    try {
      await pageHeaderPo.clickItem(PageHeaderItem.DISCIPLINES);
      await disciplinesNavigationPo.waitForDisplayDiscipline(discipline);
    } catch (error) {
      throw new Error(`Discipline "${discipline}" check error: ${error}`);
    }
  });

  return await urlTrapFun();
};
