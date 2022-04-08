const UserService = require("../services/user.services");

const createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = UserService.createUser(name, password, email);
    res.status(201).json({
      ok: true,
      code: 201,
      message: "User created successfully",
      user,
    })
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json({
      ok: true,
      code: 200,
      message: "",
      users,
    })
  } catch (err) {
    console.log(err)
    res.json({ error: err.message });
  }
}

module.exports = {
    createUser,
    getUsers
}