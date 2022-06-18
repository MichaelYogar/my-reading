const { readJSONFile } = require("../utility");
const Table = require("cli-table");
const moment = require("moment");

/**
 * The command's main function
 *
 * @param {Object} argv
 */
function command(argv) {
  const obj = readJSONFile("data");

  // Create output data
  let output = [];
  if (argv.p || argv.priority) {
    output = [...obj["priority"]];
  } else if (argv.a || argv.all) {
    output = [...obj["all"]];
  } else {
    output = [...obj["recent"].slice(0, argv.r)];
  }

  // Display output data
  const table = new Table({
    style: { head: ["green"] },
    head: ["Id", "Readings", "Created", "Status"],
    colWidths: [30, 30, 30, 30],
  });

  output = output.map((item) => {
    item["created"] = moment(item["created"]).fromNow();
    return item;
  });
  output.forEach((item) => table.push(Object.values(item)));
  console.log(table.toString());
}

/**
 * Builder function that is run with yargs instance to specify command-specific configuration
 * @param {Object} yargs
 */
function builder(yargs) {
  yargs.option("p", {
    alias: "priority",
    describe: "Get links flagged as priority",
    type: "boolean",
    default: false,
  });

  yargs.option("a", {
    alias: "all",
    describe: "Get all links",
    type: "boolean",
    default: false,
  });

  yargs.option("r", {
    alias: "recent",
    describe: "Get most recent links MAX=10",
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
