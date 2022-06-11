const yargs = require("yargs")(process.argv.splice(2));
const store = require("./commands/store.js");
function start() {
  yargs
    .usage("Usage: $0 <command> [options]")
    // Add link
    .fail(handleError);

  yargs.command(store);

  try {
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
