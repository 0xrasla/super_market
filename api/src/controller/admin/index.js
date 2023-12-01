import { AdminService } from "../../services/admin/index.js";

export const AdminController = {
  login: {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
    },
    handler: async function (request, reply, fastify) {
      const { email, password } = request.body;

      const { ok, data, message } = await AdminService.login(email, password);

      let token = "";

      if (ok) {
        token = fastify.jwt.sign({ email, role: "admin" });
      }

      return reply
        .code(ok ? 200 : 400)
        .setCookie("token", token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ ok, data, message });
    },
  },
};
