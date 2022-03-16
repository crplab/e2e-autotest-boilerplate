import {Discipline} from "src/core/modules/disciplines/types/discipline";
import {DISCIPLINE_NAME} from "src/core/modules/disciplines/constants/discipline-name";

export const findDisciplineByName = (name: string): Discipline => {
  const upperCaseName = name.toUpperCase();

  const [key] = Object.entries(DISCIPLINE_NAME).find(([key, name]) => {
    return (name.toUpperCase() === upperCaseName);
  });

  return Discipline[key];
}
