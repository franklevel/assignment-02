const fs = require("fs");
const path = require("path");
const lib = {};

lib.baseDir = path.join(__dirname, "/../.data/");

lib.create = function(dir, file, data, callback) {
  let newData = [];
  lib.read(dir, file, function(sourceData) {
    sourceData =
      sourceData && sourceData.length > 0 ? JSON.parse(sourceData) : [];

    if (typeof sourceData === "object" && sourceData) {
      sourceData.push(data);
      newData = sourceData;
    } else {
      newData = newData.push(data);
    }

    if (newData && newData.length > 0) {
      fs.writeFile(
        lib.baseDir + dir + "/" + file + ".json",
        JSON.stringify(newData),
        function(err) {
          if (!err && newData) {
            callback(newData);
          } else {
            callback(err);
          }
        }
      );
    }
  });
};

lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", function(
    err,
    data
  ) {
    if (!err) {
      callback(data);
    } else {
      callback(err);
    }
  });
};

lib.delete = function(dir, file, id, callback) {
  lib.read(dir, file, function(sourceData) {
    if (sourceData && sourceData.length > 0) {
      callback();
    }
  });
};

module.exports = lib;
