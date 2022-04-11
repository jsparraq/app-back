const User = require('../models/User.model')

exports.createUser = async (name, password, email) => {
    const user = await User.create({name, email, password})
    return user
};

exports.getUsers = async () => {
  return User.findAll({
    attributes: ['name', 'email']
  });
};
