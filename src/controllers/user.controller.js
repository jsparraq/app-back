const UserService = require("../services/user.services");
const roles = require("../shared/enums/roles")

const createEmployee = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!(name && password && email)) {
      res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }
    const user = await UserService.createUser(name, password, email, roles.EMPLOYEE);
    res.status(201).json({
      ok: true,
      code: 201,
      message: "Employee created successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
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
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({
        ok: false,
        error: "All fields are required",
      });
    }
    const user = await UserService.login(email, password);
    res.status(200).json({
      ok: true,
      code: 200,
      message: "User successfully authenticated",
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createEmployee,
  getUsers,
  login,
};
