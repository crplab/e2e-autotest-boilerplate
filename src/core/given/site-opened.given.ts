import {changeUrlAction} from "src/common/actions/change-url.action";

export const siteOpenedGiven = async (): Promise<void> => {
  await changeUrlAction('/');
};
