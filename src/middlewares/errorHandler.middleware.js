const { handleError } = require("../shared/errors/errorHandler")

const errorHandler = (err, _, res, _next) => {
  handleError(err, res);
};

module.exports = errorHandler;
