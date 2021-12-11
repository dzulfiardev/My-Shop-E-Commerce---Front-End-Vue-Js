import router from "vue-router";
import { restrictApi } from "../plugins/axios";

export const order = {
  namespaced: true,
  state: {
    order: {},
    showOrders: [],
    table: {
      orders: [],
      detailOrder: [],
      // singleOrder: {},
    },
    tableLoader: "",
    errorUpdate: "",
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
    orderDetail({ commit }, id) {
      commit("orderDetail", []);
      restrictApi
        .get("/order-detail/" + id)
        .then((res) => {
          commit("orderDetail", res.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    updateOrder({ commit }, payload) {
      let form = new FormData();
      form.append("order_id", payload.orderId);
      form.append("tracking_number", payload.trackingNumber);
      form.append("courier", payload.courier);

      restrictApi
        .post("/deliver-order", form)
        .then((res) => {
          console.log(res.data);
          alert(res.data.success);
        })
        .catch((err) => {
          const error = err.response.data.error;
          commit("errorUpdate", error);
          console.log(error);
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
        return {
          id: res.id,
          transactionId: res.order_transaction_id,
          uid: res.order_uid,
          email: res.email,
          customerName: res.user_fullname,
          status: res.order_status,
          datetime: res.created_at,
        };
      });
    },
    orderDetail(state, data) {
      state.table.detailOrder = data;
    },
    errorUpdate(state, data) {
      state.errorUpdate = data;
    },
    dateFormat(dateValue) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
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
    getOrderDetail(state) {
      return state.table.detailOrder;
    },
    getErrorUpdate(state) {
      return state.errorUpdate;
    },
  },
};
