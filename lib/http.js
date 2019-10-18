const httpStatus = {
  OK: {
    code: 200,
    message: "OK"
  },
  CREATED: {
    code: 201,
    message: "Created"
  },
  FOUND: {
    code: 302,
    message: "Found"
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad request"
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized"
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden"
  },
  NOT_FOUND: {
    code: 404,
    message: "Not found"
  },
  METHOD_NOT_ALLOW: {
    code: 405,
    message: "Method not allow"
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal server error"
  },
  BAD_GATEWAY: {
    code: 502,
    message: "Bad gateway"
  }
};

module.exports = httpStatus;
