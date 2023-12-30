
exports.errorHandleMiddleware = function (err, req, res, next) {
  console.log("middleware: ", { err: err, res: res });
  const statusCode = err.statusCode || 500;
  const status = err.status || 'internal_server_error';
  const message = err.message || 'Internal Server Error';
  const info = err.info || {
    stack: err.stack,
  };

  res.status(statusCode).json({
    status: status,
    message,
    info,
  });
}

class ApiError extends Error {
  constructor(statusCode = 500, message = 'Internal Server Error', status = 'internal_server_error', info = {}) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.info = info;
  }
}

exports.ApiError = ApiError;