import {before} from "src/common/qa/before";
import {step} from "src/common/qa/step";
import {DISCIPLINES_SUITE_NAME} from "src/specs/Disciplines/constants";
import {PageHeaderItem, pageHeaderPo} from "src/core/modules/pageHeader/pageObjects/page.header.po";
import {disciplinesNavigationPo} from "src/core/modules/disciplines/pageObjects/disciplines-navigation.po";
import {DISCIPLINE_NAME} from "src/core/modules/disciplines/constants/discipline-name";
import {siteOpenedGiven} from "src/core/given/site-opened.given";
import {loggerService} from "src/common/log/logger.service";


describe(DISCIPLINES_SUITE_NAME, () => {
  beforeEach(async () => {
    await before('Site opened', async () => {
      await siteOpenedGiven();
    });
  });

  it('Disciplines/Has tabs', async () => {
    await step('I click on the "Disciplines" item in the site navigation', async () => {
      await pageHeaderPo.clickItem(PageHeaderItem.DISCIPLINES);
    });

    await step('See all disciplines', async () => {
      await disciplinesNavigationPo.waitForDisplayed();

      const itemTextArray = await disciplinesNavigationPo.getItemTextArray();
      const disciplineNames = Object.values(DISCIPLINE_NAME);

      await loggerService.log(`${disciplinesNavigationPo.getAlias()} Items: ${itemTextArray}`);
      await loggerService.log(`All disciplines: ${disciplineNames}`);

      expect(itemTextArray.length).toEqual(disciplineNames.length);

      const upperCaseDisciplineNames = disciplineNames.map((disciplineName) => disciplineName.toUpperCase());

      itemTextArray.forEach((itemText) => {
        expect(upperCaseDisciplineNames).toContain(itemText);
      });
    });
  });
});
