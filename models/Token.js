const _data = require("../lib/data");
const config = require("../lib/config");
const crypto = require("crypto");
const hmac = crypto.createHmac("sha256", config.secret);
const Token = {};

Token.baseDir = "token";
Token.collection = "token";

Token.create = function(data) {
  const payload = JSON.stringify({
    sub: "1234567890",
    name: "John Doe",
    iat: 1516239022
  });

  const sign = payload;
  const prevData = JSON.parse(data);
  const updatedData = JSON.stringify({
    ...prevData,
    token: hmac.update(sign).digest("base64"),
    expire: Date.now() + 1000 * 60 * 60 * 24,
    createdAt: Date.now()
  });
  //console.log(updatedData);
  return _data.create(Token.baseDir, Token.collection, updatedData);
};

/* Token.show = function(id) {
  return _data.getById(Token.baseDir, Token.collection, id);
};

Token.update = function(id, data) {
  return _data.update(Token.baseDir, Token.collection, id, data);
}; */

Token.delete = function(id) {
  return _data.delete(Token.baseDir, Token.collection, id);
};

Token.verify = function(token) {
  const tokenData = _data.find(Token.baseDir, Token.collection, "token", token);
  return JSON.parse(tokenData);
};

module.exports = Token;
