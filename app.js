const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const router = require("./router");
const Generic = {};

const app = http.createServer((req, res) => {
  // Get the URL en parse it
  var parsedUrl = url.parse(req.url, true);
  // Get the current path
  var path = parsedUrl.pathname;
  // Trim de path
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
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
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound; */

    // Construct the data object to send to the handler
    const data = {
      trimmedPath: trimmedPath,
      queryString: queryString,
      method: method,
      headers: headers,
      payload: buffer
    };

    const chosenRoute =
      typeof router.dispatch(trimmedPath, method, buffer) !== "undefined"
        ? router.dispatch(trimmedPath, method, buffer)
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
      console.log("-", method.toUpperCase(), statusCode, payloadString);
    });
  });
});

// not found handler
Generic.notFound = (data, callback) => {
  callback(404);
};

module.exports = app;
