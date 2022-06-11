/**
 * The command's main function
 *
 * @param {Object} argv
 */
function command(argv) {
  console.log(argv);
  let priority = false;
  if (argv.priority) {
    priority = true;
  }
  console.log(priority);
}

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
