"use strict";

import { join } from "node:path";

//
import AutoLoad from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import fastifyFormbody from "@fastify/formbody";
import fastifyCors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import cookie from "@fastify/cookie";

// custom config
import { schema } from "./src/config/schema.js";
import { fileURLToPath } from "url";
import { connectDb } from "./src/config/db.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const options = {};

export default async function (fastify, opts) {
  fastify.register(fastifyEnv, {
    confKey: "config",
    schema,
    dotenv: true,
    data: process.env,
  });

  connectDb();

  fastify.register(fastifyCors, {
    origin: "*",
  });

  fastify.register(helmet);

  fastify.register(fastifyFormbody);

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });

  fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET,
    hook: "onRequest",
    parseOptions: {},
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "/src/plugins"),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "/src/routes"),
    options: Object.assign({}, opts),
  });
}

const _options = options;
export { _options as options };
