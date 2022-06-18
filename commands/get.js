const { readJSONFile } = require("../utility");
const Table = require("cli-table");

/**
 * The command's main function
 *
 * @param {Object} argv
 */
function command(argv) {
  let output = [];
  obj = readJSONFile("data");
  if (argv.p || argv.priority) {
    output = [...obj["priority"]];
  } else if (argv.a || argv.all) {
    output = [...obj["all"]];
  } else {
    output = [...obj["recent"].slice(0, argv.r)];
  }
  const table = new Table({
    style: { head: ["green"] },
    head: ["Readings", "Created", "Status"],
    colWidths: [30, 30, 30],
  });
  output.forEach((item) => table.push(item));
  console.log(table.toString());
}

/**
 * Builder function that is run with yargs instance to specify command-specific configuration
 * @param {Object} yargs
 */
function builder(yargs) {
  // Define the priority option
  yargs.option("p", {
    alias: "priority",
    describe: "Get links flagged as priority",
    type: "boolean",
    default: false,
  });

  // Define the all option
  yargs.option("a", {
    alias: "all",
    describe: "Get all links",
    type: "boolean",
    default: false,
  });

  // Define the all option
  yargs.option("r", {
    alias: "recent",
    describe: "Get most recent links",
    type: "number",
    default: 3,
  });
}

/**
 * Command usage
 * @type {String}
 */
module.exports.command = "get [id]";

/**
 * General usage information
 * @type {String}
 */
module.exports.describe = "Get URL link(s)";

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
