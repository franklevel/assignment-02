const UserController = require("../controllers/User");
const MenuController = require("../controllers/Menu");
const AuthController = require("../controllers/Auth");

const routes = {
  "/": () => {
    return JSON.stringify({ statudCode: 200, message: "OK" });
  },
  // User routes
  "/user": UserController.index,
  "/user/create": UserController.create,
  "/user/show/:id": UserController.show,
  "/user/update/:id": UserController.update,
  "/user/delete/:id": UserController.delete,
  "/user/get/:userId/:contractId": UserController.test,
  // Order routes
  "/order": () => {},
  "/order/show/:id": id => {},
  "/order/delete/": () => {},
  // Menu routes
  "/menu": MenuController.index,
  "/menu/create": MenuController.create,
  // Test Login
  "/auth/get": AuthController.get
};

module.exports = routes;
