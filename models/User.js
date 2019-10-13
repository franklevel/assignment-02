const _data = require("../lib/data");

const User = {};

User.baseDir = "user";
User.collection = "user";

/* User.index = function(callback) {
  _data.read(User.baseDir, User.collection, function(error, data) {
    if (!error && data) {
      callback(data);
    } else {
      callback(error);
    }
  });
}; */

User.index = function() {
  return _data.getAll(User.baseDir, User.collection);
};

/* User.create = function(data, callback) {
  _data.create(User.baseDir, "user", data, function(err) {
    if (!err) {
      callback(data);
    } else {
      callback(err);
    }
  });
}; */

User.create = function(data) {
  return _data.create(User.baseDir, User.collection, data);
};

User.show = function(id) {
  return _data.getById(User.baseDir, User.collection, id);
};

User.update = function(id, payload) {};

User.delete = function(id) {};

module.exports = User;
