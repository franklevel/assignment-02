/***
 *
 * Node.js Master Class
 * Assignment # 2
 * Author: Frank Ruiz
 *
 */

const crypto = require("crypto");
const app = require("./app");
const config = require("./lib/config");
const _data = require("./lib/data");
const Menu = require("./models/Menu");

// Start the server
app.listen(config.port, () => {
  console.log(`Listening on ${config.baseUrl}:${config.port}`);
});
