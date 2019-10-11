const crypto = require("crypto");
const User = {};

// login handler
User.login = (data, callback) => {
  callback(200, {
    username: "username",
    password: "password",
    token: crypto.createHash("sha256").digest("base64")
  });
};

// logout handler
User.logout = (data, callback) => {
  callback(200, { status: "ok" });
};

User.create = (data, callback) => {
  callback({ data: data, message: "User was created", status: "OK" });
};

User.show = (id, callback) => {
  callback({ id: id, message: "Users was shown", status: "OK" });
};

module.exports = User;
