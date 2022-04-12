const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/envVars");

const verifyToken = (req, res, next) => {
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

module.exports = {
  verifyToken,
};
