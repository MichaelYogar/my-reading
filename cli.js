const yargs = require("yargs")(process.argv.splice(2));
const commands = require("./commands");

// Path of cli.js as global constant
global.ROOT_PATH = __dirname;

function start() {
  // Yargs initialization
  yargs
    .usage("Usage: $0 <command> [options]")
    .fail(handleError)
    .alias({ v: "version", h: "help" })
    .demandCommand(1, "Please input valid command")
    .strict();

  // Define commands
  yargs.command(commands.get).command(commands.rm).command(commands.store);

  try {
    // Parse command args
    yargs.parse();
  } catch (err) {
    handleError(err);
  }
}

function handleError(err) {
  console.error("Error: " + err.toString() + "\n");
  console.error("Use --help option to get more information about the usage\n");
  process.exit(1);
}

module.exports = start;
