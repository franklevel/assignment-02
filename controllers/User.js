const crypto = require("crypto");
const User = require("../models/User");
const UserController = {};

UserController.index = () => {
  return User.index(function(data) {
    return data;
  });
};

/* UserController.create = (data, callback) => {
  User.create(data, function(result) {
    callback({ data: data, message: "User was created", status: "OK" });
  });
}; */

UserController.create = payload => {
  return User.create(payload, function(data) {
    return data;
  });
};

UserController.show = (id, callback) => {
  callback({ id: id, message: "Users was shown", status: "OK" });
};

// login handler
UserController.login = callback => {
  callback(200, JSON.stringify([{ message: "Bien!" }]));
};

// logout handler
UserController.logout = (data, callback) => {
  callback(200, { status: "ok" });
};

module.exports = UserController;
