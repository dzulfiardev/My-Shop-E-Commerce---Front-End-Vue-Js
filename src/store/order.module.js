// import { api } from "../plugins/axios";
import router from "vue-router";

export const order = {
  namespaced: true,
  state: {
    order: {},
  },
  actions: {},
  mutations: {
    updateOrder(state, data) {
      if (!data) {
        return router.push("/");
      }
      state.order = data;
      console.log(data.products);
    },
  },
  getters: {
    getOrder(state) {
      return state.order;
    },
  },
};
