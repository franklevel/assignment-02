const _data = require("../lib/data");
const Menu = {};

Menu.baseDir = "menu";
Menu.collection = "menu";

Menu.index = function() {
  return _data.getAll(Menu.baseDir, Menu.collection);
};

Menu.create = function(data) {
  return _data.create(Menu.baseDir, Menu.collection, data);
};

Menu.show = function(id) {
  return _data.getById(Menu.baseDir, Menu.collection, id);
};

Menu.update = function(id, data) {
  return _data.update(Menu.baseDir, Menu.collection, id, data);
};

Menu.delete = function(id) {
  return _data.delete(Menu.baseDir, Menu.collection, id);
};

module.exports = Menu;
