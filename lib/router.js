const User = require("../controllers/User");

// Define routers
/* const router = {
  login: User.login,
  logout: User.logout,
  user: User.create
}; */

const routes = {
  "user/create": User.create,
  "user/show": User.show
};

const router = {
  get: route => {
    console.log(`Works => GET ${route}`);
  },
  post: (route, controller, payload) => {
    //console.log(`Works => POST ${route} => ${routes[route]} ${payload}`);
    routes[route](payload, (data, c) => {
      console.log(data);
    });
  },
  put: (route, payload) => {
    console.log(`Works => PUT ${route} ${payload}`);
  },
  patch: (route, payload) => {
    console.log(`Works => PATCH ${route}  ${payload}`);
  },
  delete: route => {
    console.log(`Works => DELETE ${route} `);
  }
};

router.dispatch = (route, method, controller, payload) => {
  if (method.toLowerCase() === "get") {
    return router.get(route, controller);
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

module.exports = router;
