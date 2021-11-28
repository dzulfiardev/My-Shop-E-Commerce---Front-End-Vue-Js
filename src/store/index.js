import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./auth.module";
import { product } from "./product.module";
import { cart } from "./cart.module";
import { productManage } from "./productManage.module";
import { order } from "./order.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    product,
    cart,
    productManage,
    order,
  },
});
