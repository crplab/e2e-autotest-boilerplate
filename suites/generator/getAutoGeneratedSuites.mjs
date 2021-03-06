import {DEFAULT_PATH_TO_SPECS, SPEC_EXTENSION} from "./constants.mjs";
import {getAllFilePathsInDirectory} from "./getAllFilePathsInDirectory.mjs";

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const fixSuiteName = (suiteName) => {
    const suiteNameParts = suiteName.split('.');

    const fixedSuiteNamePart = [
        suiteNameParts[0],
        ...suiteNameParts.slice(1).map((suiteNamePart) => {
            return capitalize(suiteNamePart);
        })
    ];

    return fixedSuiteNamePart.join('');
};

const getSuitesForSpecFile = (pathToSpecs, file) => {
    let suiteNames = file.replace(`${pathToSpecs}/`, '').split('/');
    suiteNames = suiteNames.splice(0, (suiteNames.length - 1));
    return suiteNames.map((suiteName) => {
        return fixSuiteName(suiteName);
    });
};

export const getAutoGeneratedSuites = () => {
    const pathToSpecs = DEFAULT_PATH_TO_SPECS;

    const suites = {};

    const specFilePathArray = getAllFilePathsInDirectory(pathToSpecs, SPEC_EXTENSION);

    specFilePathArray.forEach((specFilePath) => {
        const suiteNames = getSuitesForSpecFile(pathToSpecs, specFilePath);

        suiteNames.forEach((suiteName) => {
            if (suites[suiteName]) {
                suites[suiteName] = [
                    ...suites[suiteName],
                    specFilePath
                ];
            } else {
                suites[suiteName] = [specFilePath];
            }
        });
    });

    return suites;
};
