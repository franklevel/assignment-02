const _data = require("../lib/data");

const Menu = {};

Menu.baseDir = "menu";

Menu.read = function(callback) {
  _data.read(Menu.baseDir, "menu", function(error, data) {
    if (!error && data) {
      callback(JSON.parse(data));
    } else {
      console.log(error);
    }
  });
};

Menu.get = function(id, callback) {
  Menu.read(function(data) {
    if (data && data.length > 0) {
      callback(
        data.find(item => {
          return item.id === parseInt(id);
        })
      );
    } else {
      console.log("The given ID is not exist");
    }
  });
};

Menu.create = function(data, callback) {
  _data.create(Menu.baseDir, "menu", data, function(err) {
    if (!err) {
      callback(data);
    } else {
      callback(err);
    }
  });
};

Menu.update = function(id, newData, callback) {
  _data.read(Menu.baseDir, "menu", function(error, data) {
    let parsedData = JSON.parse(data);
    if (!error && parsedData.length > 0) {
      data
        .filter(item => {
          return item.id !== parseInt(id);
        })
        .push(newData);
      _data.create(Menu.baseDir, "menu", _newData, function(err) {
        if (!err) {
          callback(true);
        } else {
          callback(err);
        }
      });
    }
  });
};

Menu.destroy = function(id, callback) {};

module.exports = Menu;
