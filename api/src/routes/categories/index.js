"use strict";

import { CategoryController } from "../../controller/category/index.js";

export default async function (fastify, opts) {
  fastify.post(
    "/add",
    { schema: CategoryController.addCategory.schema },
    async function (request, reply) {
      return CategoryController.addCategory.handler(request, reply, fastify);
    }
  );

  fastify.get(
    "/all",
    { schema: CategoryController.getCategories.schema },
    async function (request, reply) {
      return CategoryController.getCategories.handler(request, reply, fastify);
    }
  );

  fastify.get(
    "/",
    { schema: CategoryController.getCategory.schema },
    async function (request, reply) {
      return CategoryController.getCategory.handler(request, reply, fastify);
    }
  );

  fastify.put(
    "/",
    { schema: CategoryController.updateCategory.schema },
    async function (request, reply) {
      return CategoryController.updateCategory.handler(request, reply, fastify);
    }
  );

  fastify.delete(
    "/",
    { schema: CategoryController.deleteCategory.schema },
    async function (request, reply) {
      return CategoryController.deleteCategory.handler(request, reply, fastify);
    }
  );
}
