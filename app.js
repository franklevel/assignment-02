const http = require("http");
const router = require("./lib/router");

const app = http.createServer((req, res) => {
  /* const chosenRoute = function(data, callback) {
      callback(200, data.payload, router.dispatch(route, method, parsedBuffer));
    };*/

  const responseCallback = (statusCode, payload, responseData) => {
    // Use the status code called back by the handler, or default
    statusCode = typeof statusCode == "number" ? statusCode : 200;
    // Use the payload called back by the handler, or default to
    payload = typeof payload === "object" ? payload : {};
    // Convert the payload to JSON format
    payloadString = JSON.stringify(payload);
    // Set JSON response
    res.setHeader("Content-Type", "application/json");
    // Set the head status
    res.writeHead(statusCode);
    // Send the response
    res.end(responseData);
    // Log the request path
    //console.log("=>", method.toUpperCase(), statusCode, payloadString);
  };

  /*chosenRoute(data, responseCallback); */
  router.dispatch(req, res, responseCallback);
  //});
});

// not found handler
/* Generic.notFound = (data, callback) => {
  callback(404, data);
}; */

module.exports = app;
