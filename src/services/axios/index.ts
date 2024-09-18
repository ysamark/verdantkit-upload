import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {},
});

axios.interceptors.request.use((config) => {
  const API_ACCESS_TOKEN = "getApiAccessToken()";

  Object.assign(config.headers, {
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  });

  return config;
});
