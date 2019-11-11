const Token = require("../models/Token");
const User = require("../models/User");
const AuthController = {};
const httpStatus = require("../lib/http");
/* AuthController.index = () => {
  return Auth.index(function(data) {
    return data;
  });
};

AuthController.create = payload => {
  return Auth.create(payload, function(data) {
    return data;
  });
};

AuthController.show = id => {
  return Auth.show(id);
};

AuthController.update = (id, payload) => {
  return Auth.update(id, payload, function(data) {
    return data;
  });
};

// Auth destroy
AuthController.delete = id => {
  return Auth.delete(id);
};
 */

AuthController.check = token => {
  console.log("This is a middleware");
  return Token.verify(token);
};

AuthController.get = payload => {
  const data = JSON.parse(payload);
  const user = JSON.parse(User.find("email", data.email));
  //console.log(user);
  if (user && typeof user === "object" && data.password === user.password) {
    return Token.create(payload);
  } else {
    return JSON.stringify(httpStatus.UNAUTHORIZED);
  }
};
module.exports = AuthController;
