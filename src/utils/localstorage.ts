export const getStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) ?? "";
  }
};

export const saveStorage = (key: string, data: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
};

export const removeStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
