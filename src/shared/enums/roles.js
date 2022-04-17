const roles = {
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
  all() {
    const allRoles = Object.values(this);
    allRoles.pop();
    return allRoles;
  },
};

module.exports = roles;
