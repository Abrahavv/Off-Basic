// Safe localStorage helper to prevent crashes in private modes, older browsers, or when storage is blocked
export const safeStorage = {
  getItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] Error getting key "${key}":`, e);
    }
    return null;
  },

  setItem(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn(`[SafeStorage] Error setting key "${key}":`, e);
    }
    return false;
  },

  removeItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return true;
      }
    } catch (e) {
      console.warn(`[SafeStorage] Error removing key "${key}":`, e);
    }
    return false;
  }
};
