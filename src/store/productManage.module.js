import { api } from "../plugins/axios";

export const productManage = {
  namespaced: true,
  state: {
    categories: [],
  },
  actions: {
    categories({ commit }) {
      api
        .get("/category")
        .then((res) => {
          let bindData = res.data.map((response) => {
            return {
              value: response.id,
              text: response.category_name,
            };
          });
          const allCategories = {
            value: "all",
            text: "All Categories",
          };
          bindData = [allCategories, ...bindData];
          commit("categories", bindData);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mutations: {
    categories(state, bindData) {
      state.categories = bindData;
    },
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
  },
};
