const UserController = require("../controllers/User");

const routes = {
  "/user": UserController.index,
  "/user/create": UserController.create,
  "/user/show/:id": UserController.show,
  "/user/update/:id": UserController.update,
  "/user/destroy/:id": UserController.delete,
  "/user/get/:userId/:contractId": UserController.test
};

const router = {
  get: route => {
    const params = router.parser(route);
    console.log(params);
    return routes[route]("123456789");
  },
  post: (route, payload) => {
    return routes[route](payload);
  },
  put: (route, payload) => {
    return routes[route](id, payload);
  },
  patch: (route, payload) => {
    return routes[route](id, payload);
  },
  delete: route => {
    return routes[route](id);
  },
  raw: route => {
    //console.log(`Route: ${route}`);
    const params = router.parser(route);
    console.log(params);
    const args = params.args;
    return params.controller(...args);
  }
};

router.dispatch = (route, method, payload) => {
  if (method.toLowerCase() === "get") {
    return router.raw(route);
  } else if (method.toLowerCase() === "post") {
    return router.post(route, payload);
  } else if (
    method.toLowerCase() === "put" ||
    method.toLowerCase() === "patch"
  ) {
    return router.put(route, payload);
  } else if (method.toLowerCase() === "delete") {
    return router.delete(route);
  } else {
    return JSON.stringify({ statusCode: 405, message: "Unsupported method" });
  }
};

router.parser = route => {
  // parse and recreate config for use

  _routes = Object.keys(routes)
    // sort longest path first
    .sort(function(a, b) {
      return b.length - a.length;
    })
    // convert into more usable format
    .map(function(path) {
      let _param = path.match(/:[^\s/]+/g);
      let _clearedParam = null;
      if (_param && typeof _param === "object" && _param.length > 0) {
        _clearedParam = _param.map(item => {
          return item.replace(/:/, "");
        });
      }
      let params = [];
      _param = _clearedParam;
      params.push(_param);
      return {
        // create regex
        params: params[0],
        //path: new RegExp("^" + path.replace(/:[^\s/]+/g, "([\\w-]+)") + "$"),
        path: path.replace(/:[^\s/]+/g, "([\\w-]+)"),
        module: routes[path]
      };
    });

  let controller = "";
  let params = [];
  let args = [];
  // loop through all routes, longest first
  for (var i = 0, l = _routes.length; i < l; i++) {
    // parse if possible
    var found = route.match(_routes[i].path);
    if (found) {
      // parsed successfully
      //console.log("module: " + _routes[i].module); // module to load
      //console.log("args:", found.slice(1)); // arguments for module
      params = _routes[i].params;
      controller = _routes[i].module;
      args = found.slice(1);
      break; // ignore the rest of the paths
    }
  }
  return {
    controller: controller,
    params: params,
    args: args
  };
};

//router.parser("/user/show/1234");
//console.log(router.parser("/user/get/1234/4321"));

module.exports = router;
