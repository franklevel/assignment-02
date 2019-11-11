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

// Read data a retrieve all
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

// Get data by id
lib.find = function(dir, file, field, value) {
  const source = JSON.parse(lib.getAll(dir, file));
  const data = source.find(item => {
    return item[field] === value;
  });
  //console.log("Field Value", field, value);
  return JSON.stringify(data);
};

// Update any data
lib.update = function(dir, file, id, data) {
  let newData = [];
  const prevData = JSON.parse(lib.getById(dir, file, id));
  const updateData = JSON.parse(data);
  sourceData = lib.read(dir, file);
  sourceData =
    sourceData && sourceData.length > 0 ? JSON.parse(sourceData) : [];
  if (typeof sourceData === "object" && sourceData) {
    newData = sourceData.filter(item => {
      return item.id !== id;
    });
    if (typeof prevData === "object" && typeof updateData === "object") {
      newData.push({ ...prevData, ...updateData });
      result = { status: "OK", message: "Data was updated successfully" };
    } else {
      newData.push(prevData);
      result = { status: "error", message: "Data could not be updated" };
    }
  }
  try {
    fs.writeFileSync(
      lib.baseDir + dir + "/" + file + ".json",
      JSON.stringify(newData, null, "\t")
    );
  } catch (err) {}

  return JSON.stringify(result);
};

// Delete any data
lib.delete = function(dir, file, id) {
  let newData = [];
  sourceData = lib.read(dir, file);
  sourceData =
    sourceData && sourceData.length > 0 ? JSON.parse(sourceData) : [];
  if (typeof sourceData === "object" && sourceData) {
    newData = sourceData.filter(item => {
      return item.id != id;
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
  return JSON.stringify({ status: "OK" });
};

module.exports = lib;
