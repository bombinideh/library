const prefix = "ceac_app_";

const token = {
  set: (token: string) => {
    localStorage.setItem(`${prefix}token`, JSON.stringify(token));
  },
  get: () => JSON.parse(localStorage.getItem(`${prefix}token`) as string),
  clear: () => localStorage.removeItem(`${prefix}token`),
};

const theme = {
  set: (theme: string) => {
    localStorage.setItem(`${prefix}theme`, JSON.stringify(theme));
  },
  get: () => JSON.parse(localStorage.getItem(`${prefix}theme`) as string),
  clear: () => localStorage.removeItem(`${prefix}theme`),
};

const storage = { token, theme };

export default storage;
