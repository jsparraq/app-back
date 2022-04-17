class ErrorHandler extends Error {
  constructor(code, message = "Something went wrong", error = undefined) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.message = message;
    this.error = error;
  }
}

const handleError = (err, res) => {
  let { code, message, error, stack } = err;

  if (!code || code < 100 || code >= 600) {
    code = 500;
  }

  res.status(code).json({
    ok: false,
    code,
    message,
    error,
    stack: process.env.NODE_ENV !== "production" ? stack : undefined,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
