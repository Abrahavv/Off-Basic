// ===== APP CONFIGURATION =====
// Centralized constants to avoid hardcoding across components

export const WHATSAPP_NUMBER = '584227867935';

// Catalog access — hash-based validation (not plaintext)
export const validateCatalogKey = (input) => {
  if (!input || typeof input !== 'string') return false;
  let hash = 0;
  const str = input.trim().toLowerCase();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash === -1726905951;
};

// Catalog unlock TTL (7 days in milliseconds)
export const CATALOG_UNLOCK_TTL = 7 * 24 * 60 * 60 * 1000;
