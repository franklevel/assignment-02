const routes = require("../routes/routes");
const url = require("url");
const { parse } = require("querystring");
const { StringDecoder } = require("string_decoder");
const httpStatus = require("../lib/http");
const helpers = require("../lib/helpers");
const Token = require("../models/Token");
const router = {};

router.dispatch = (req, res, callback) => {
  // Get the URL en parse it
  var parsedUrl = url.parse(req.url, true);
  // Get the current path
  var path = parsedUrl.pathname;
  // Trim de path
  var route = path;
  //var route = path.replace(/^\/+|\/+$/g, "");
  // Get the query string a an object
  var queryString = parsedUrl.query;
  // Get the HTTP method
  var method = req.method.toLowerCase();
  // Get the headers as an object
  var headers = req.headers;
  // Get the payload
  var decoder = new StringDecoder("utf-8");
  var buffer = "";

  req.on("data", data => (buffer += decoder.write(data)));

  req.on("end", () => {
    buffer += decoder.end();
    // Construct the data object to send to the handler
    const data = {
      route: route,
      queryString: queryString,
      method: method,
      headers: headers,
      payload: JSON.stringify(parse(buffer.toString()))
    };
    // Parse and format the payload
    //const parsedBuffer = JSON.stringify(parse(buffer.toString()));
    const formattedRoute = `@${method}:${route}`;
    const resource = router.parse(formattedRoute);
    const response = router.response(resource, data);
    callback(200, data.payload, response);
  });
};

router.auth = token => {
  console.log("Auth middleware, auth token: ", token);
};

router.parse = route => {
  // parse and recreate config for use
  if (!route || typeof route === undefined) return;

  const _routes = Object.keys(routes)
    // sort longest path first
    .sort(function(a, b) {
      return b.length - a.length;
    })
    // convert into more usable format
    .map(function(path) {
      let _param = path.match(/:[^\s/]+/g);
      let _args = route.match(/([a-z0-9+]{16,})/g);
      let _method = path.match(/^@(get|post|put|patch|delete):+/g);
      let _path = path
        .replace(/:[^\s/]+/g, "[a-z0-9]{3,}")
        .replace(/^@(get|post|put|patch|delete):+/g, "^@([\\w-]+):")
        .replace(/\//g, "\\/");
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
        params: params[0],
        args: _args,
        method: _method,
        path: _path,
        controller: routes[path]
      };
    });
  //console.log(_routes);
  let controller = "";
  let params = [];
  let args = [];
  let method = "";
  let path = "";

  // loop through all routes, longest first
  for (var i = 0, l = _routes.length; i < l; i++) {
    // parse if possible
    const found = route.match(_routes[i].path);
    if (found) {
      // parsed successfully
      path = _routes[i].path;
      method = found.slice(1); //_routes[i].method;
      params = _routes[i].params;
      controller = _routes[i].controller;
      args = _routes[i].args; //_routes[i].args;
      break; // ignore the rest of the paths
    }
  }

  const response = {
    method: method,
    controller: controller,
    params: params,
    args: args,
    path: path
  };

  return response && typeof response !== undefined
    ? response
    : JSON.stringify(httpStatus.BAD_REQUEST);
};

router.response = (resource, data) => {
  console.log(resource);
  const { method, payload, headers } = data;
  const { controller, args } = resource;
  const isIterable = helpers.isIterable(args) ? true : false;
  // Show headers
  if (typeof controller !== "function")
    return JSON.stringify(httpStatus.NOT_FOUND);

  console.log("Is iterable? ", isIterable);

  switch (method.toLowerCase()) {
    case "get":
      return isIterable ? controller(...args) : controller();
    case "post":
      return controller(payload);
    case "put":
      return isIterable ? controller(...args, payload) : controller(payload);
    case "patch":
      return isIterable ? controller(...args, payload) : controller(payload);
    case "delete":
      return isIterable ? controller(...args) : controller();
    default:
      return JSON.stringify(httpStatus.METHOD_NOT_ALLOW);
  }
};

module.exports = router;
