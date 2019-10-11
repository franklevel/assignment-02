const StringDecoder = require("string_decoder").StringDecoder;
const User = require("./controllers/User");
const decoder = new StringDecoder("utf-8");

// Define routers
/* const router = {
  login: User.login,
  logout: User.logout,
  user: User.create
}; */

const router = {};

const response = {
  get: route => {
    console.log("works GET");
  },
  post: (route, payload) => {
    const stringDecoded = Buffer.from(payload);
    console.log(
      "works POST, data",
      JSON.stringify(decoder.write(stringDecoded))
    );
  },
  put: (route, payload) => {
    console.log("works PUT");
  },
  patch: (route, payload) => {
    console.log("works PATCH");
  },
  delete: route => {
    console.log("works DELETE");
  }
};

router.dispatch = (route, method, payload) => {
  if (method.toLowerCase() === "get") {
    return response.get(route);
  } else if (method.toLowerCase() === "post") {
    return response.post(route, payload);
  } else if (
    method.toLowerCase() === "put" ||
    method.toLowerCase() === "patch"
  ) {
    return response.put(route, payload);
  } else if (method.toLowerCase() === "delete") {
    return response.delete(route, payload);
  } else {
    return "Invalid method";
  }
};

module.exports = router;
