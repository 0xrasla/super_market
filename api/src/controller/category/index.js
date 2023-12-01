import { CategoryService } from "../../services/category/index.js";

export const CategoryController = {
  addCategory: {
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { name } = request.body;

      const { ok, data, message } = await CategoryService.addCategory({
        name,
      });

      return reply
        .code(ok ? 201 : 400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ ok, data, message });
    },
  },

  getCategories: {
    schema: {
      querystring: {
        type: "object",
        required: [],
        properties: {
          page: {
            type: "number",
          },
          limit: {
            type: "number",
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { page, limit } = request.query;

      const { ok, data, message } = await CategoryService.getCategories({
        page,
        limit,
      });

      return reply
        .code(ok ? 200 : 400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ ok, data, message });
    },
  },

  getCategory: {
    schema: {
      querystring: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "string",
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { id } = request.query;

      const { ok, data, message } = await CategoryService.getCategory({
        id,
      });

      return reply
        .code(ok ? 200 : 400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ ok, data, message });
    },
  },

  updateCategory: {
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
        },
      },
      querystring: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "string",
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { name } = request.body;
      const { id } = request.query;

      const { ok, data, message } = await CategoryService.updateCategory({
        name,
        id,
      });

      return reply
        .code(ok ? 200 : 400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ ok, data, message });
    },
  },

  deleteCategory: {
    schema: {
      querystring: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "string",
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { id } = request.query;

      const { ok, data, message } = await CategoryService.deleteCategory({
        id,
      });

      return reply
        .code(ok ? 200 : 400)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ ok, data, message });
    },
  },
};
