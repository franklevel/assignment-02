/***
 *
 * Node.js Master Class
 * Assignment # 2
 * Author: Frank Ruiz
 *
 */
const app = require("./app");
const config = require("./lib/config");

// Start the server
app.listen(config.port, () => {
  console.log(`Listening on ${config.baseUrl}:${config.port}`);
});
