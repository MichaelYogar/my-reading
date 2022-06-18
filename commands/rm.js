const { readJSONFile, writeJSONFile } = require("../utility");

/**
 * The command's main function
 *
 * @param {Object} argv
 */
const command = (argv) => {
  const { id, all, read } = argv;
  let obj = readJSONFile("data");
  if (all) {
    Object.keys(obj).forEach((key) => {
      obj[key] = [];
    });
  } else if (read) {
    Object.entries(obj).forEach(([key, value]) => {
      obj[key] = value.filter((item) => item["status"] !== "READ");
    });
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      obj[key] = value.filter((item) => item["id"] !== id);
    });
  }

  writeJSONFile(obj, "data.json");
};

/**
 * Builder function that is run with yargs instance to specify command-specific configuration
 * @param {Object} yargs
 */
const builder = (yargs) => {
  yargs.positional("id", {
    describe: "The id of the link that you want to remove",
    type: "String",
  });

  yargs.option("a", {
    alias: "all",
    describe: "Remove all links",
    type: "boolean",
    default: false,
  });

  yargs.option("r", {
    alias: "read",
    describe: "Remove all links that are marked as READ",
    type: "boolean",
    default: false,
  });
};

/**
 * Command usage
 * @type {String}
 */
module.exports.command = "rm [id]";

/**
 * General usage information
 * @type {String}
 */
module.exports.describe = "Remove URL link(s)";

/**
 * Run with the parsed argv object
 * @type {Function}
 */
module.exports.handler = command;

/**
 * Builder
 *
 * @type {Function}
 */
module.exports.builder = builder;
