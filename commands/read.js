const { readJSONFile, writeJSONFile } = require("../utility");
/**
 * The command's main function
 *
 * @param {Object} argv
 */
const command = (argv) => {
  const { id } = argv;
  let obj = readJSONFile("data");
  Object.entries(obj).forEach(([key, value]) => {
    value.forEach((entry) => {
      if (entry["id"] === id) {
        entry["status"] = "READ";
      }
    });
  });
  writeJSONFile(obj, "data.json");
};

/**
 * Builder function that is run with yargs instance to specify command-specific configuration
 * @param {Object} yargs
 */
const builder = (yargs) => {
  yargs.positional("id", {
    describe: "Id of the link to update to READ",
    type: "String",
    required: true,
  });
};

/**
 * Command usage
 * @type {String}
 */
module.exports.command = "read <id>";

/**
 * General usage information
 * @type {String}
 */
module.exports.describe = "Set link's status to READ";

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
