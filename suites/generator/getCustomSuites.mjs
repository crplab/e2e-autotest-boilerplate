import fs from "fs";
import {getAllFilePathsInDirectory} from "./getAllFilePathsInDirectory.mjs";
import {CUSTOM_SUITS_PATH} from "./constants.mjs";

export const getCustomSuites = () => {
    const customSuitesPath = CUSTOM_SUITS_PATH;

    if (!fs.existsSync(customSuitesPath)) {
        fs.mkdirSync(customSuitesPath);
    }

    const customSuiteFilePathArray = getAllFilePathsInDirectory(customSuitesPath, 'json');

    const suites = {};

    customSuiteFilePathArray.forEach((customSuiteFilePath) => {
        let suiteName = customSuiteFilePath.replace(`${customSuitesPath}/`, '');
        suiteName = suiteName.replace(`.json`, '');

        suites[suiteName] = JSON.parse(fs.readFileSync(customSuiteFilePath));
    });

    return suites;
};
