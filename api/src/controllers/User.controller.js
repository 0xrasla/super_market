export const UserController = {
  createUser: async (req, res) => {
    const { name, email, password, role } = req.body;

    const newUser = {
      name,
      email,
      password,
      role,
    };

    res.status(201).json(newUser);
  },
};
