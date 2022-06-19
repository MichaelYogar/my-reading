const { getHomeDirectory } = require("./utility");
const fs = require("fs");
const path = require("path");
(() => {
  console.log("init");
  const myreadingDir = getHomeDirectory();
  try {
    fs.mkdirSync(myreadingDir);
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }

  fs.copyFileSync(
    path.join(__dirname, "data.json"),
    path.join(myreadingDir, "data.json")
  );
})();
