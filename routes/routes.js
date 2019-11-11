const {
  UserController,
  AuthController,
  MenuController,
  OrderController
} = require("../controllers/index");

const routes = {
  // User routes
  "@get:/user": UserController.index,
  "@post:/user/create": UserController.create,
  "@get:/user/show/:id": UserController.show,
  "@get:/user/test/:argOne/:argTwo": UserController.show,
  "@put:/user/update/:id": UserController.update,
  "@delete:/user/delete/:id": UserController.delete,
  //"@get:/user/get/:userId/:contractId": UserController.test,
  // Order routes
  "@get:/order": OrderController.index,
  "@post:/order/tokens": OrderController.tokens,
  //"@get:/order/show/:id": id => {},
  //"@delete:/order/delete/": () => {},
  // Menu routes
  "@get:/menu": MenuController.index,
  //"@post:/menu/create": MenuController.create,
  // Test Login
  "@get:/auth/get": AuthController.get
};

module.exports = routes;
