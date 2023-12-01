const schema = {
  type: "object",
  required: ["PORT", "DB_NAME", "DB_URL"],
  properties: {
    PORT: {
      type: "string",
    },
    DB_NAME: {
      type: "string",
    },
    DB_URL: {
      type: "string",
    },
  },
};

export { schema };
