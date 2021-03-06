const { UserServices } = require("../services");
const roles = require("../shared/enums/roles");

const createEmployee = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!(name && password && email)) {
      res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }
    const employee = await UserServices.createUser(
      name,
      password,
      email,
      roles.EMPLOYEE
    );
    res.status(201).json({
      ok: true,
      code: 201,
      message: "Employee created successfully",
      employee,
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserServices.getUsers();
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

const deleteEmployee = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUser(userId);
    res.status(200).json({
      ok: true,
      code: 200,
      message: "Employee deleted successfully",
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
    const user = await UserServices.login(email, password);
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
  deleteEmployee,
};
