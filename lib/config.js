const path = require("path");
const config = {
  baseUrl: "http://localhost",
  dataDir: path.join(__dirname, "/../.data"),
  modelDir: path.join(__dirname, "/../models"),
  controllerDir: path.join(__dirname, "/../controllers"),
  port: process.env.PORT || 5000,
  salt: "mys4ltk3y"
};

module.exports = config;
