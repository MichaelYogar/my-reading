const { readJSONFile, writeJSONFile } = require("../utility");

/**
 * The command's main function
 *
 * @param {Object} argv
 */
const command = (argv) => {
  const { id, all } = argv;
  let obj = readJSONFile("data");
  if (all) {
    Object.keys(obj).forEach((key) => {
      obj[key] = [];
    });
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      obj[key] = value.filter((item) => item[0] !== id);
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
