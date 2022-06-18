const path = require("node:path");
const fs = require("fs");
const os = require("os");
const XDG_DATA_HOME = "/.local/share";
const HOME_DIR = os.homedir();

/**
 * Check if file path provided is valid
 * @param {String} filePath
 * @returns {Boolean}
 */
const _isValidFile = (filePath) => {
  filePath = path.resolve(filePath);
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};

/**
 *
 * @param {String} filePath
 * @param {String?} ext
 * @returns Resolves absolute file path
 */
const _resolveFilePath = (filePath, ext) => {
  let resolvedPath = path.resolve(filePath);

  if (path.extname(resolvedPath) != "." + ext) {
    resolvedPath += "." + ext;
  }

  return resolvedPath;
};

const readFile = (fileName, ext) => {
  const dataPath = path.join(HOME_DIR, XDG_DATA_HOME, "/myreading", fileName);
  const file = _resolveFilePath(dataPath, ext);

  if (!_isValidFile(file)) {
    throw new Error(`${file} does not exist!`);
  }

  try {
    return fs.readFileSync(file);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Reads JSON file
 * @param {String} filePath
 * @returns {Object}
 */
const readJSONFile = (filePath) => {
  const file = readFile(filePath, "json");

  try {
    return JSON.parse(file);
  } catch (error) {
    throw new Error(`${filePath} is an invalid JSON file!`);
  }
};

/**
 * Write data to file
 * @param {Object} data
 * @param {String} fileName
 */
const writeJSONFile = (data, fileName) => {
  fs.writeFile(
    path.join(HOME_DIR, XDG_DATA_HOME, "/myreading", fileName + ".json"),
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Written data");
      }
    }
  );
};

module.exports = {
  readFile,
  readJSONFile,
  writeJSONFile,
};
