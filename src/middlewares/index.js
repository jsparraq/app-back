const { authMiddleware } = require("./auth.middleware");
const fileMiddleware = require("./file.middleware")

module.exports = {
    authMiddleware,
    fileMiddleware
}