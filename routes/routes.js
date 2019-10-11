const router = require("../lib/router");

const routes = {};

const UserController = {};
UserController.get = id => {
  return {
    id: id,
    name: "John",
    email: "johndoe@gmail.com",
    address: "First Street"
  };
};

routes.get("/user", UserController, function(data) {
  console.log(data);
});
