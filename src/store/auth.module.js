import { restrictApi } from "../plugins/axios";

const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

const initState = loggedIn
  ? {
      status: {
        loggedIn: true,
      },
      user: loggedIn.user,
      registerMsg: "",
      userCount: 0,
      customerCount: 0,
    }
  : {
      status: {
        loggedIn: false,
      },
      user: null,
      registerMsg: "",
      userCount: 0,
      customerCount: 0,
    };

export const auth = {
  namespaced: true,
  state: initState,
  getters: {
    registerMsg(state) {
      return state.registerMsg;
    },
    getUser(state) {
      return state.user;
    },
    loginState(state) {
      return state.status.loggedIn;
    },
    getUserCount(state) {
      return state.userCount;
    },
    getCustomerCount(state) {
      return state.customerCount;
    },
  },
  actions: {
    successMsg({ commit }, msg) {
      commit("registerSuccess", msg);
    },
    login({ commit }, data) {
      commit("currentUser", data);
    },
    logout({ commit }) {
      localStorage.removeItem("loggedIn");
      commit("deleteCurrentUser");
    },
    userCount({ commit }) {
      restrictApi
        .get("/users-list/" + 4)
        .then((res) => {
          commit("userCount", res.data.length);
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data.message);
        });
    },
    customerCount({ commit }) {
      restrictApi
        .get("/customers")
        .then((res) => {
          commit("customerCount", res.data.length);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mutations: {
    registerSuccess(state, data) {
      state.status.loggedIn = false;
      state.registerMsg = data;
      setInterval(() => {
        state.registerMsg = "";
      }, 4000);
    },
    registerFailure(state, data) {
      state.status.loggedIn = false;
      state.registerMsg = data;
    },
    currentUser(state, data) {
      (state.status.loggedIn = true), (state.user = data);
    },
    deleteCurrentUser(state) {
      (state.status.loggedIn = false), (state.user = null);
    },
    userCount(state, data) {
      state.userCount = data;
    },
    customerCount(state, data) {
      state.customerCount = data;
    },
  },
};
