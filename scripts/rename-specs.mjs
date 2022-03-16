import fs from "fs";
import glob from "glob";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import removeMarkdown from 'remove-markdown';

// Constants
const DEFAULT_PATH_TO_SPECS = './src/specs';
const SPEC_EXTENSION = 'spec.ts';

// Utils
export const getAllFilePathsInDirectory = (directoryPath, extension = '*') => {
    return glob.sync(`${directoryPath}/**/*.${extension}`);
};

const removeSpecials = (text) => {
    text = text.replace(/[^a-zA-Z ]/g, ' ');
    text = text.replace(/\s+/g, ' ').trim();
    return text;
}

const toPascalCase = (text) => {
    return `${text}`
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w+)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

// Core
const getNewSpecFileName = (fileName) => {
    fileName = fileName.replace(`.${SPEC_EXTENSION}`, '');

    const cyrillicToTranslit = new CyrillicToTranslit();
    fileName = cyrillicToTranslit.transform(fileName);

    fileName = removeMarkdown(fileName);

    fileName = removeSpecials(fileName);

    fileName = fileName.toLowerCase();

    fileName = fileName.replace(/\s/g, '-');

    fileName += `.${SPEC_EXTENSION}`;
    return fileName;
};

const getNewDirectoryName = (directoryName) => {
    const cyrillicToTranslit = new CyrillicToTranslit();
    directoryName = cyrillicToTranslit.transform(directoryName);

    directoryName = removeMarkdown(directoryName);

    directoryName = removeSpecials(directoryName);

    directoryName = toPascalCase(directoryName);
    return directoryName;
};

const getNewPath = (oldPath) => {
    oldPath = oldPath.replace(DEFAULT_PATH_TO_SPECS, '');

    let newPath = oldPath.split('/').map((pathPart, index, array) => {
        if (index === (array.length - 1)) {
            return getNewSpecFileName(pathPart);
        } else {
            return getNewDirectoryName(pathPart);
        }
    }).join('/');

    return `${DEFAULT_PATH_TO_SPECS}${newPath}`;
};

// Main
const main = () => {
    const specFilePathArray = getAllFilePathsInDirectory(DEFAULT_PATH_TO_SPECS, SPEC_EXTENSION);

    specFilePathArray.forEach((oldPath) => {
        const newPath = getNewPath(oldPath);
        const newDirectory = newPath.split('/').slice(0, -1).join('/');

        if (!fs.existsSync(newDirectory)) {
            fs.mkdirSync(newDirectory, { recursive: true });
        }

        fs.renameSync(oldPath, newPath);
    });
};

try {
    main();
} catch (error) {
    console.error(error);
}
