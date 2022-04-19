const DB_URI = process.env.DB_URI;

const regexDBUri =
  /postgres:\/\/([a-z]+):([a-z0-9]+)@([a-z0-9-.]+):([0-9]+)\/([a-z0-9]+)/;
const matchDBUri = DB_URI.match(regexDBUri);

exports.HOST_DB = matchDBUri[3];
exports.DB_NAME = matchDBUri[5];
exports.USER_DB = matchDBUri[1];
exports.PASS_DB = matchDBUri[2];
exports.PORT_DB = matchDBUri[4];
exports.JWT_KEY = process.env.JWT_KEY;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.EMAIL = process.env.EMAIL;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.ADMIN_EMAIL = process.env.ADMIN_EMAIL;
