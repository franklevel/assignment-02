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

UserController.show = id => {
  return User.show(id);
};

// login handler
UserController.login = callback => {
  callback(200, JSON.stringify([{ message: "Bien!" }]));
};

// logout handler
UserController.logout = (data, callback) => {
  callback(200, { status: "ok" });
};

// User destroy
UserController.destroy = id => {};

// User Test Controller with params
UserController.test = (param1, param2) => {
  return { arg1: param1, arg2: param2 };
};

module.exports = UserController;
