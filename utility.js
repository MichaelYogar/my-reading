const path = require("node:path");
const fs = require("fs");

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

const readFile = (filePath, ext) => {
  filePath = _resolveFilePath(filePath, ext);

  if (!_isValidFile(filePath)) {
    throw new Error(`${filePath} does not exist!`);
  }

  try {
    return fs.readFileSync(filePath);
  } catch (error) {
    throw new Error(error);
  }

  return content;
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

module.exports = {
  readFile,
  readJSONFile,
};
