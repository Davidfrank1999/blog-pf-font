
function requireEnv(varName, fallback = "") {
  const value = import.meta.env[varName];
  if (value === undefined || value === "") {
    console.warn(`Missing environment variable: ${varName}`);
    return fallback;
  }
  return value;
}

export const env = {
  api: {
    url: requireEnv("VITE_API_URL", "http://localhost:5000/api"),
  },
  adsense: {
    client: requireEnv("VITE_ADSENSE_CLIENT"),
    slot: requireEnv("VITE_ADSENSE_SLOT"),
  },
  app: {
    mode: import.meta.env.MODE, // "development" or "production"
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  },
};
