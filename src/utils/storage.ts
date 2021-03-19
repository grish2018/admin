export const setStorage = (key: string, data: string): void => {
  window.localStorage.setItem(key, data);
};

export const getStorage = (key: string): void => {
  window.localStorage.getItem(key);
};

export const removeStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};
