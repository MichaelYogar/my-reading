const { readJSONFile, writeJSONFile } = require("../utility");

/**
 * The command's main function
 *
 * @param {Object} argv
 */
const command = (argv) => {
  let obj = readJSONFile("data");
  obj = _updateJSONObject(obj, argv);
  writeJSONFile(obj, "data.json");
};

const _updateJSONObject = (obj, argv) => {
  const currentDate = Date.now();
  const data = [
    _generateIdByDate(currentDate),
    argv.link,
    currentDate,
    "UNREAD",
  ];

  // Update Recent
  obj["recent"].push(data);
  while (obj["recent"].length >= 10) {
    obj["recent"].shift();
  }

  // Update All
  obj["all"].push(data);

  // Update priority
  if (argv.p || argv.priority) {
    obj["priority"].push(data);
  }

  return obj;
};

const _generateIdByDate = (date) =>
  (date + Math.random()).toString(36).split("").reverse().join("");

/**
 * Builder function that is run with yargs instance to specify command-specific configuration
 * @param {Object} yargs
 */
const builder = (yargs) => {
  // Define the link argument
  yargs.positional("link", {
    describe: "The link that you want to store",
    type: "string",
  });

  // Define the priority option
  yargs.option("p", {
    alias: "priority",
    describe: "Set the link you want to store as a priority",
    type: "boolean",
    default: false,
  });
};

/**
 * Command usage
 * @type {String}
 */
module.exports.command = "store <link>";

/**
 * General usage information
 * @type {String}
 */
module.exports.describe = "Store URL link";

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
