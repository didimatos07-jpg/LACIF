// Memory fallback cache in case localStorage or sessionStorage is restricted (e.g., inside strict browser settings or sandbox iframes)
const memoryCache: Record<string, string> = {};
const sessionMemoryCache: Record<string, string> = {};

export const SafeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage block detected on getItem for key: ${key}. Using in-memory fallback.`, e);
    }
    return memoryCache[key] !== undefined ? memoryCache[key] : null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage block detected on setItem for key: ${key}. Using in-memory fallback.`, e);
    }
    memoryCache[key] = value;
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage block detected on removeItem for key: ${key}. Using in-memory fallback.`, e);
    }
    delete memoryCache[key];
  }
};

export const SafeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] sessionStorage block detected on getItem for key: ${key}. Using in-memory fallback.`, e);
    }
    return sessionMemoryCache[key] !== undefined ? sessionMemoryCache[key] : null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] sessionStorage block detected on setItem for key: ${key}. Using in-memory fallback.`, e);
    }
    sessionMemoryCache[key] = value;
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] sessionStorage block detected on removeItem for key: ${key}. Using in-memory fallback.`, e);
    }
    delete sessionMemoryCache[key];
  }
};
