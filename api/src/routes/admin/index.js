"use strict";

import { AdminController } from "../../controller/admin/index.js";

export default async function (fastify, opts) {
  fastify.post(
    "/login",
    { schema: AdminController.login.schema },
    async function (request, reply) {
      return AdminController.login.handler(request, reply, fastify);
    }
  );
}
