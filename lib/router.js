const UserController = require("../controllers/User");

// Define routers
/* const router = {
  login: UserController.login,
  logout: UserController.logout,
  user: UserController.create
}; */

const routes = {
  "user/index": UserController.index,
  "user/create": UserController.create,
  "user/show": UserController.show,
  "user/login": UserController.login
};

const router = {
  get: route => {
    /*  routes[route](function(status, result) {
      console.log(`${status} ${result}`);
    }); */
    routes[route]((status, result) => {
      return { status: 200, data: result };
    });
  },
  post: (route, payload) => {
    routes[route](payload, data => {
      console.log(data);
    });
  },
  put: (route, payload) => {},
  patch: (route, payload) => {},
  delete: route => {},
  raw: route => {
    return routes[route]();
  }
};

router.dispatch = (route, method, controller, payload) => {
  if (method.toLowerCase() === "get") {
    //return router.get(route, controller);
    return router.raw(route, controller);
  } else if (method.toLowerCase() === "post") {
    return router.post(route, controller, payload);
  } else if (
    method.toLowerCase() === "put" ||
    method.toLowerCase() === "patch"
  ) {
    return router.put(route, controller, payload);
  } else if (method.toLowerCase() === "delete") {
    return router.delete(route, controller, payload);
  } else {
    return null;
  }
};

router.parser = route => {};

module.exports = router;
