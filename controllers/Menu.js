const Menu = require("../models/Menu");
const MenuController = {};

MenuController.index = () => {
  return Menu.index(function(data) {
    return data;
  });
};

MenuController.create = payload => {
  return Menu.create(payload, function(data) {
    return data;
  });
};

MenuController.show = id => {
  return Menu.show(id);
};

MenuController.update = (id, payload) => {
  return Menu.update(id, payload, function(data) {
    return data;
  });
};

// Menu destroy
MenuController.delete = id => {
  return Menu.delete(id);
};

module.exports = MenuController;
