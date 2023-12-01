export const Env = {
  get(key) {
    return process.env[key];
  },

  set(key, value) {
    process.env[key] = value;
  },

  unset(key) {
    delete process.env[key];
  },

  getKeys() {
    return Object.keys(process.env);
  },
};
