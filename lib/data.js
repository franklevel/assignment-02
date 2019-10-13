const fs = require("fs");
const path = require("path");
const lib = {};
const helpers = require("../lib/helpers");

lib.baseDir = path.join(__dirname, "/../.data/");

/* lib.create = function(dir, file, data, callback) {
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
}; */

lib.create = function(dir, file, data) {
  let newData = [];
  let sourceData = [];
  sourceData = lib.read(dir, file);
  sourceData =
    sourceData && sourceData.length > 0 ? JSON.parse(sourceData) : [];

  if (typeof sourceData === "object" && sourceData) {
    //Object.assign({}, JSON.parse(data), { id: helpers.randomString() })
    data = JSON.parse(data);
    sourceData.push({ id: helpers.randomString(), ...data });
    newData = sourceData;
  } else {
    newData = newData.push(data);
  }

  try {
    fs.writeFileSync(
      lib.baseDir + dir + "/" + file + ".json",
      JSON.stringify(newData, null, "\t")
    );
  } catch (err) {
    console.log(err);
  }
  return JSON.stringify(data);
};

/* lib.read = function(dir, file, callback) {
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
}; */

// Read file and return its content
lib.read = function(dir, file) {
  return fs.readFileSync(lib.baseDir + dir + "/" + file + ".json", "utf8");
};

// Read with Return and without callback
lib.getAll = function(dir, file) {
  return fs.readFileSync(lib.baseDir + dir + "/" + file + ".json", "utf8");
};

// Get data by id
lib.getById = function(dir, file, id) {
  const source = JSON.parse(lib.getAll(dir, file));
  const data = source.find(item => {
    return item.id === id;
  });
  return JSON.stringify(data);
};

lib.delete = function(dir, file, id) {
  let newData = [];
  sourceData = lib.read(dir, file);
  sourceData =
    sourceData && sourceData.length > 0 ? JSON.parse(sourceData) : [];
  if (typeof sourceData === "object" && sourceData) {
    newData = sourceData.filter(item => {
      return item.id === parseInt(id);
    });
  }
  try {
    fs.writeFileSync(
      lib.baseDir + dir + "/" + file + ".json",
      JSON.stringify(newData, null, "\t")
    );
  } catch (err) {
    console.log(err);
  }
  return JSON.stringify(data);
};

module.exports = lib;
