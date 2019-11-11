module.exports = function(token) {
  if (token) {
    const accessToken = JSON.parse(Token.verify(token));
    if (!accessToken.authorized) {
      return JSON.stringify(accessToken);
    }
  }
};
