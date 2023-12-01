export const AdminService = {
  login: async function (email, password) {
    if (email === "admin@gmail.com" && password === "admin") {
      return {
        ok: true,
        data: {
          email: "admin@gmail.com",
          role: "admin",
        },
        message: "Logged in successfully",
      };
    }

    return {
      ok: false,
      data: [],
      message: "Invalid credentials",
    };
  },
};
