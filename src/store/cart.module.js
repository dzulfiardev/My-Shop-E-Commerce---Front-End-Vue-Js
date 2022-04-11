import { api } from "../plugins/axios";

let cartItems = [];
cartItems = JSON.parse(localStorage.getItem("cart"));

const initState = cartItems
  ? { shoppingCart: cartItems, shoppingCartCount: 0 }
  : { shoppingCart: [], shoppingCartCount: 0 };

export const cart = {
  namespaced: true,
  state: initState,
  getters: {
    getCartItems(state) {
      return state.shoppingCart;
    },
    getCartItemsCount(state, getters) {
      return getters.getCartItems.length;
    },
    getTotalPrice(state, getters) {
      return getters.getCartItems.reduce((sum, data) => {
        return sum + data.totalPrice;
      }, 0);
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      console.log(payload.cartQty);
      api
        .get("/detail-product/" + payload.slug)
        .then((res) => {
          let totalPrice = res.data.product_price * payload.cartQty;
          const items = {
            id: res.data.id,
            name: res.data.product_name,
            image:
              process.env.VUE_APP_ASSET_PRODUCT_IMG_URL +
              res.data.product_image,
            price: res.data.product_price,
            quantity: payload.cartQty,
            totalPrice: totalPrice,
          };

          commit("addToCart", items);
        })
        .catch((err) => {
          console.log(err.response.data);
          const error = {
            error: err.response.data,
          };
          return error;
        });
    },
    emptyCart({ commit }) {
      commit("emptyCart");
    },
    removeItemCart({ commit }, index) {
      commit("removeItemCart", index);
    },
  },
  mutations: {
    addToCart(state, items) {
      state.shoppingCart.push(items);
      localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
    },
    emptyCart(state) {
      state.shoppingCart = [];
      localStorage.removeItem("cart");
    },
    removeItemCart(state, data) {
      let cart = state.shoppingCart;
      cart.splice(data, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
};
