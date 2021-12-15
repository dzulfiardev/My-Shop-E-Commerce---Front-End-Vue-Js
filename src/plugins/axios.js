import Vue from "vue";
import axios from "axios";

const api = axios.create({
  baseURL: "http://myshopapi.us-east-1.elasticbeanstalk.com/api/",
  withCredentials: true,
});

const restrictApi = axios.create({
  baseURL: "http://myshopapi.us-east-1.elasticbeanstalk.com/api/",
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
