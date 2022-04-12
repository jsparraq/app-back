const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const { JWT_KEY } = require("../config/envVars");

exports.createUser = async (name, password, email) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return User.create({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  })
    .then((user) => {
      return { name: user.name, email: user.email };
    })
    .catch((err) => {
      throw Error(err.original.message);
    });
};

exports.getUsers = async () => {
  return User.findAll({
    attributes: ["name", "email"],
  });
};

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  const passwordValidation = await bcrypt.compare(password, user.password);
  if (user && passwordValidation) {
    const token = jwt.sign({ user_id: user.id, email }, JWT_KEY, {
      expiresIn: "5h",
    });

    return { name: user.name, email: user.email, token };
  }
  throw Error("Invalid credentials");
};
