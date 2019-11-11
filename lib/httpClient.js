const request = require("request");
const httpClient = {};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body));
  }
}

httpClient.get = path => {
  const options = {
    url: "https://api.stripe.com/v1" + path,
    auth: {
      user: "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
      pass: ""
    }
  };
  request(options, callback);
};

httpClient.post = (path, payload) => {
  const options = {
    url: "https://api.stripe.com/v1" + path,
    method: "POST",
    body: payload,
    auth: {
      user: "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
      pass: ""
    }
  };
  request(options, callback);
};

module.exports = httpClient;
