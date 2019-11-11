const helpers = {};

helpers.randomString = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

helpers.isIterable = object => {
  return object != null && typeof object[Symbol.iterator] === "function";
};

module.exports = helpers;
