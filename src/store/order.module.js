import router from "vue-router";
import { restrictApi } from "../plugins/axios";

export const order = {
  namespaced: true,
  state: {
    order: {},
    showOrders: [],
    table: {
      orders: [],
    },
    tableLoader: "",
  },
  actions: {
    showOrders({ commit }) {
      let loader = true;
      commit("tableLoader", loader);
      restrictApi
        .get("/orders")
        .then((res) => {
          loader = false;
          commit("showOrders", res.data);
          commit("tableLoader", loader);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mutations: {
    updateOrder(state, data) {
      if (!data) {
        return router.push("/");
      }
      state.order = data;
      console.log(data.products);
    },
    showOrders(state, data) {
      state.showOrders = data.map((res) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const d = new Date(res.created_at);
        const date = d.getDate();
        const D = date <= 9 ? "0" + date : date;
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        const hour = d.getHours();
        const H = hour <= 9 ? "0" + hour : hour;
        const min = d.getMinutes();
        const M = min <= 9 ? "0" + min : min;
        const sec = d.getUTCSeconds();
        const S = sec <= 9 ? "0" + sec : sec;
        const dateTime = `${D} ${month} ${year} - ${H}:${M}:${S}`;

        return {
          id: res.id,
          transactionId: res.order_transaction_id,
          uid: res.order_uid,
          email: res.email,
          customerName: res.user_fullname,
          status: res.order_status,
          datetime: dateTime,
        };
      });
    },
    dateFormat(dateValue) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const d = new Date(dateValue);
      const date = d.getDate();
      const D = date <= 9 ? "0" + date : date;
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      const hour = d.getHours();
      const H = hour <= 9 ? "0" + hour : hour;
      const min = d.getMinutes();
      const M = min <= 9 ? "0" + min : min;
      const sec = d.getUTCSeconds();
      const S = sec <= 9 ? "0" + sec : sec;
      return `${D} ${month} ${year} - ${H}:${M}:${S}`;
    },
    tableLoader(state, data) {
      if (state.showOrders.length > 0) {
        state.tableLoader = false;
      } else {
        state.tableLoader = data;
      }
    },
  },
  getters: {
    getOrder(state) {
      return state.order;
    },
    getShowOrders(state) {
      return state.showOrders;
    },
    getTableLoader(state) {
      return state.tableLoader;
    },
  },
};
