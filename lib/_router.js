const routes = require("../routes/routes");

const router = {
  get: route => {
    const params = router.parser(route);
    console.log(params);
    const args = params.args;
    return params.controller(...args);
  },
  post: (route, payload) => {
    const params = router.parser(route);
    console.log(params);
    const args = params.args;
    return params.controller(...args, payload);
  },
  put: (route, payload) => {
    const params = router.parser(route);
    console.log(params);
    const args = params.args;
    return params.controller(...args, payload);
  },
  patch: (route, payload) => {
    const params = router.parser(route);
    console.log(params);
    const args = params.args;
    return params.controller(payload, ...args);
  },
  delete: route => {
    const params = router.parser(route);
    console.log(params);
    const args = params.args;
    return params.controller(...args);
  },
  raw: route => {
    const params = router.parser(route);
    console.log(params);
    const args = params.args;
    return params.controller(...args);
  }
};

router.dispatch = (route, method, payload) => {
  method = method.toLowerCase();
  if (method === "get") {
    return router.get(route);
  } else if (method.toLowerCase() === "post") {
    return router.post(route, payload);
  } else if (method === "put" || method === "patch") {
    return router.put(route, payload);
  } else if (method === "delete") {
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

module.exports = router;
