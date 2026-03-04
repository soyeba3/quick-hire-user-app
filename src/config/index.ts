export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  apiEndpoint: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  authTokenLocalStorageKey: "qh_token",
};

export const apiEndpoint = config.apiEndpoint;
export const authTokenLocalStorageKey = config.authTokenLocalStorageKey;
