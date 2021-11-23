import { api } from "../plugins/axios";

export const product = {
  namespaced: true,
  state: {
    category: "",
    allProductGuest: "",
    categoryProduct: {},
    categoryProductLoader: "",
    webSearch: {},
    webSearchLoader: "",
    autoComplete: [],
  },
  getters: {
    getCategory(state) {
      return state.category;
    },
    getProductGuest(state) {
      return state.allProductGuest;
    },
    getCategoryProduct(state) {
      return state.categoryProduct;
    },
    getCategoryProductLoader(state) {
      return state.categoryProductLoader;
    },
    getWebSearch(state) {
      return state.webSearch;
    },
    getWebSearchLoader(state) {
      return state.webSearchLoader;
    },
    getAutoComplete(state) {
      return state.autoComplete;
    },
  },
  actions: {
    category({ commit }) {
      api
        .get("/category")
        .then((res) => {
          commit("category", res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    allProductGuest({ commit }) {
      api
        .get("/all-product")
        .then((res) => {
          console.log(res);
          commit("allProductGuest", res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    categoryProduct({ commit }, category) {
      let loader = true;
      commit("categoryProductLoader", loader);
      api
        .get("/product-category/" + category)
        .then((res) => {
          loader = false;
          commit("categoryProduct", res.data);
          commit("categoryProductLoader", loader);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      window.scroll(0, 0);
    },
    webSearch({ commit }, keyword) {
      let loader = true;
      commit("webSearchLoader", loader);
      api
        .get("/search/" + keyword)
        .then((res) => {
          console.log(res.data);
          loader = false;
          commit("webSearch", res.data);
          commit("webSearchLoader", loader);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err) {
            commit("webSearch", "Searching Error");
          }
        });
      window.scroll(0, 0);
    },
    autoComplete({ commit }, keyword) {
      api
        .get("/search/" + keyword)
        .then((res) => {
          const data = res.data.map((data) => {
            return [data.product_name, data.category_name];
          });
          console.log(data);
          commit("autoComplete", data);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data) {
            commit("autoComplete", "Searching Error");
          }
        });
    },
  },
  mutations: {
    category(state, data) {
      state.category = data;
    },
    allProductGuest(state, data) {
      state.allProductGuest = data;
    },
    categoryProduct(state, data) {
      state.categoryProduct = data;
    },
    categoryProductLoader(state, data) {
      state.categoryProductLoader = data;
    },
    webSearch(state, data) {
      state.webSearch = data;
    },
    webSearchLoader(state, data) {
      state.webSearchLoader = data;
    },
    autoComplete(state, data) {
      state.autoComplete = data;
    },
  },
};
