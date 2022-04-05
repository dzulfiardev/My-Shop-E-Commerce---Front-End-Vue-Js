import Vue from "vue";
import axios from "axios";

const deployUrl = process.env.PRODUCTION_API_URL;

const api = axios.create({
  baseURL: deployUrl,
  withCredentials: true,
});

const restrictApi = axios.create({
  baseURL: deployUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});

restrictApi.interceptors.request.use((config) => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  if (loggedIn.token) {
    config.headers["Authorization"] = "Bearer " + loggedIn.token;
  }

  return config;
});

Vue.prototype.$api = api;
Vue.prototype.$restrictApi = restrictApi;

export { api, restrictApi };
