const userLocalStorageKey = "user";

export const getUserFromLocalStorage = (): string | null => localStorage.getItem(userLocalStorageKey);

export const removeUserFromLocalStorage = () => localStorage.removeItem(userLocalStorageKey);

export const setUserToLocalStorage = (user: string) => localStorage.setItem(userLocalStorageKey, user);