import {before} from "src/common/qa/before";
import {step} from "src/common/qa/step";
import {DISCIPLINES_SUITE_NAME} from "src/specs/Disciplines/constants";
import {siteOpenedGiven} from "src/core/given/site-opened.given";
import {PageHeaderItem, pageHeaderPo} from "src/core/modules/pageHeader/pageObjects/page.header.po";
import {disciplinesNavigationPo} from "src/core/modules/disciplines/pageObjects/disciplines-navigation.po";
import {findDisciplineByName} from "src/core/modules/disciplines/helpers/find-discipline-by-name";
import {disciplinesContainerPo} from "src/core/modules/disciplines/pageObjects/discipline-container.po";
import {DISCIPLINE_CONTAINER_TITLE} from "src/core/modules/disciplines/constants/discipline-container-title";
import {hasDisciplineCheck} from "src/core/modules/disciplines/checks/has-discipline.check";
import {Discipline} from "src/core/modules/disciplines/types/discipline";


describe(DISCIPLINES_SUITE_NAME, () => {
  beforeEach(async () => {
    await before('Site opened', async () => {
      await siteOpenedGiven();
    });
  });

  it('Disciplines/Has tabs', async () => {
    await step('I click on the "Disciplines" item in the site navigation', async () => {
      await pageHeaderPo.clickItem(PageHeaderItem.DISCIPLINES);
    })

    await step('See disciplines navigation', async () => {
      await disciplinesNavigationPo.waitForDisplayed();
    });

    const itemTextArray = await disciplinesNavigationPo.getItemTextArray();

    for (const itemText of itemTextArray) {
      let discipline: Discipline;

      await step(`Click "${itemText}" discipline`, async () => {
        discipline = findDisciplineByName(itemText);
        await hasDisciplineCheck(discipline);
        await disciplinesNavigationPo.clickItem(discipline);
      });

      await step(`See "${itemText}" discipline with content`, async () => {
        await disciplinesContainerPo.waitOpenDiscipline(discipline);
        expect(await disciplinesContainerPo.getTitle()).toEqual(DISCIPLINE_CONTAINER_TITLE[discipline].toUpperCase());
        expect(await disciplinesContainerPo.getContentText()).toBeTruthy();
      });
    }
  });
});
