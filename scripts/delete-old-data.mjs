import fs from "fs";
import * as path from 'path';

console.log('Deletion old data started.');

console.log('Deletion results started.');
try {
    const RESULTS_PATH = '_results_';

    if (fs.existsSync(RESULTS_PATH)) {
        fs.rmSync(RESULTS_PATH, {recursive: true});
    }

    console.log('Deletion results finished.');
} catch (error) {
    console.error('Deletion results error: ', error);
}

console.log('Deletion report started.');
try {
    const RESULTS_PATH = 'allure-report';

    if (fs.existsSync(RESULTS_PATH)) {
        fs.rmSync(RESULTS_PATH, {recursive: true});
    }

    console.log('Deletion report finished.');
} catch (error) {
    console.log('Deletion report error: ', error);
}

console.log('Deletion tmp-files started.');
const deleteAllFilesFromDir = (dirPath, ignoredFiles = []) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (!ignoredFiles.includes(file)) {
                fs.unlink(path.join(dirPath, file), (err) => {
                    if (err) throw err;
                });
            }
        }
    });
};

try {
    const GITKEEP_FILE_NAME = '.gitkeep';
    const DOWNLOADS_DIR_NAME = 'downloads';

    const TMP_FILES_PATH = 'src/resources/temp';
    deleteAllFilesFromDir(TMP_FILES_PATH, [GITKEEP_FILE_NAME, DOWNLOADS_DIR_NAME]);

    const TMP_DOWNLOADS_FILES_PATH = `${TMP_FILES_PATH}/${DOWNLOADS_DIR_NAME}`;
    deleteAllFilesFromDir(TMP_DOWNLOADS_FILES_PATH, [GITKEEP_FILE_NAME]);

    console.log('Deletion tmp-files finished.');
} catch (error) {
    console.error('Deletion tmp-files error: ', error);
}

console.log('Deletion was successful.');
