import glob from "glob";

export const getAllFilePathsInDirectory = (directoryPath, extension = '*') => {
    return glob.sync(`${directoryPath}/**/*.${extension}`);
};
