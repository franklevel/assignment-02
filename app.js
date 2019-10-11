const http = require("http");
const url = require("url");
const { parse } = require("querystring");
const StringDecoder = require("string_decoder").StringDecoder;
const router = require("./lib/router");
const Generic = {};

const app = http.createServer((req, res) => {
  // Get the URL en parse it
  var parsedUrl = url.parse(req.url, true);
  // Get the current path
  var path = parsedUrl.pathname;
  // Trim de path
  var route = path.replace(/^\/+|\/+$/g, "");
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

    /* const chosenHandler =
      typeof router[route] !== "undefined"
        ? router[route]
        : handlers.notFound; */

    // Construct the data object to send to the handler
    const data = {
      route: route,
      queryString: queryString,
      method: method,
      headers: headers,
      payload: buffer
    };
    // Parse and format the payload
    const parsedBuffer = JSON.stringify(parse(buffer.toString()));
    const chosenRoute =
      typeof router.dispatch(route, method, parsedBuffer) !== "undefined"
        ? router.dispatch(route, method, parsedBuffer)
        : Generic.notFound;

    chosenRoute(data, (statusCode, payload) => {
      // Use the status code called back by the handler, or default
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      // Use the payload called back by the handler, or default to
      payload = typeof payload == "object" ? payload : {};
      // Convert the payload to JSON format
      var payloadString = JSON.stringify(payload);
      // Set JSON response
      res.setHeader("Content-Type", "application/json");
      // Set the head status
      res.writeHead(statusCode);
      // Send the response
      res.end(payloadString);
      // Log the request path
      console.log("=>", method.toUpperCase(), statusCode, payloadString);
    });
  });
});

// not found handler
Generic.notFound = (data, callback) => {
  callback(404);
};

module.exports = app;
