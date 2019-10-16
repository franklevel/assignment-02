const _data = require("../lib/data");

const User = {};

User.baseDir = "user";
User.collection = "user";

User.index = function() {
  return _data.getAll(User.baseDir, User.collection);
};

User.create = function(data) {
  return _data.create(User.baseDir, User.collection, data);
};

User.show = function(id) {
  return _data.getById(User.baseDir, User.collection, id);
};

User.update = function(id, data) {
  return _data.update(User.baseDir, User.collection, id, data);
};

User.delete = function(id) {
  return _data.delete(User.baseDir, User.collection, id);
};

User.find = function(field, value) {
  return _data.find(User.baseDir, User.collection, field, value);
};

module.exports = User;
