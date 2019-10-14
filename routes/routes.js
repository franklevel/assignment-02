const UserController = require("../controllers/User");

const routes = {
  // User routes
  "/user": UserController.index,
  "/user/create": UserController.create,
  "/user/show/:id": UserController.show,
  "/user/update/:id": UserController.update,
  "/user/delete/:id": UserController.delete,
  "/user/get/:userId/:contractId": UserController.test,
  // Order routes
  "/order": () => {
    console.log("Listing orders");
  },
  "/order/show/:id": id => {
    console.log(`Order ID ${id}`);
  },
  "/order/delete/": () => {}
  // Auth routes
};

module.exports = routes;
