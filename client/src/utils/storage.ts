const prefix = "ceac_app_";

const token = {
  set: (token: string) => {
    localStorage.setItem(`${prefix}token`, JSON.stringify(token));
  },
  get: () => JSON.parse(localStorage.getItem(`${prefix}token`) as string),
  clear: () => localStorage.removeItem(`${prefix}token`),
};

const storage = { token };

export default storage;
