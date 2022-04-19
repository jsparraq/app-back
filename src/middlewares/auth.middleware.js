const jwt = require("jsonwebtoken");
const { intersection } = require("lodash");

const { getUser } = require("../services/user.services");
const { JWT_KEY } = require("../config/envVars");
const { ErrorHandler } = require("../shared/errors/errorHandler");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      ok: false,
      code: 403,
      message: "A token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      ok: false,
      code: 401,
      message: "Invalid Token",
    });
  }
  return next();
};

const authRoles = (roles) => async (req, _, next) => {
  const { user } = req;
  const userDb = await getUser(user.email);
  req.user = userDb;
  if (intersection([userDb.role], roles).length) {
    return next();
  }

  return next(
    new ErrorHandler(
      403,
      "You do not have permissions to perform this operation."
    )
  );
};

module.exports = {
  authMiddleware,
  authRoles,
};
