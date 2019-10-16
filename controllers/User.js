const User = require("../models/User");
const UserController = {};

UserController.index = () => {
  return User.index(function(data) {
    return data;
  });
};

UserController.create = payload => {
  return User.create(payload, function(data) {
    return data;
  });
};

UserController.show = id => {
  return User.show(id);
};

UserController.update = (id, payload) => {
  return User.update(id, payload, function(data) {
    return data;
  });
};

// User destroy
UserController.delete = id => {
  return User.delete(id);
};

module.exports = UserController;
