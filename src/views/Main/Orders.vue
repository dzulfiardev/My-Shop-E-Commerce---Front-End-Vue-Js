<template>
  <v-app>
    <Navigation />
    <v-main>
      <v-container fluid class="px-10">
        <h1>Orders</h1>
        <v-card class="mt-5">
          <v-card-title>
            <v-row>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6"></v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="table.search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>

          <v-divider></v-divider>

          <v-data-table
            :loading="tableLoader"
            loading-text="Loading... Please wait"
            :headers="tableHead"
            :search="table.search"
            :items="ordersTable"
            :sort-desc="true"
            :sort-by="'uid'"
            class="elevation-2"
            item-key="name"
            v-model="table.selected"
          >
            <!-- Transaction ID -->
            <template v-slot:[`item.transactionId`]="{ item }">
              <a class="green--text" @click="editItem(item.id)">
                <b>{{ item.transactionId }}</b>
              </a>
            </template>
            <!-- End Transaction id -->

            <!-- Date Format -->
            <template v-slot:[`item.datetime`]="{ item }">
              {{ dateFormat(item.datetime) }}
            </template>

            <!-- Status -->
            <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getStatus(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
            <!-- End status -->

            <!-- Action Button -->
            <template v-slot:[`item.action`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="editItem(item.id)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Update Order Progress</span>
              </v-tooltip>
            </template>
            <!-- End Action Button -->
          </v-data-table>
          <v-dialog
            transition="dialog-bottom-transition"
            max-width="900"
            v-model="orderDialog"
          >
            <OrdersDialog
              :orderDialog="orderDialog"
              :orderId="orderId"
              :orderTransactionId="input.orderTransactionId"
              :input="input"
              :rules="rules"
              @closeDialog="closeDialog"
              @showOrders="showOrders"
              :orderDetail="orderDetail"
            />
          </v-dialog>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../../components/Main/Navigation.vue";
import OrdersDialog from "../../components/Orders/OrdersDialog.vue";
import { mapGetters } from "vuex";

export default {
  title: "Orders - My Shop",
  data() {
    return {
      orderDialog: false,
      loadingOverlay: true,
      orderId: 0,
      table: {
        selected: [],
        search: "",
        loading: true,
        orders: "",
      },
      tableHead: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "uid",
        },
        { text: "Transaction ID", value: "transactionId" },
        { text: "Email", value: "email", sortable: false },
        { text: "Customer Name", value: "customerName" },
        { text: "Status", value: "status" },
        { text: "Datetime", value: "datetime" },
        { text: "Action", value: "action", sortable: false },
      ],
      input: {
        id: 0,
        orderTransactionId: "",
        trackingNumber: "",
        courier: "",
      },
      rules: {
        trackingNumber: [],
        courier: [],
      },
    };
  },
  components: {
    Navigation,
    OrdersDialog,
  },
  computed: {
    ...mapGetters("order", {
      tableLoader: "getTableLoader",
      ordersTable: "getShowOrders",
      orderDetail: "getOrderDetail",
    }),
  },
  methods: {
    showOrders() {
      this.$store.dispatch("order/showOrders");
    },
    getStatus(status) {
      if (status == "Processed") {
        return "orange darken-1";
      }
      if (status == "Delivered") {
        return "light-blue darken-2";
      }
      if (status == "Recieved") {
        return "green";
      }
      if (status == "Rejected") {
        return "red";
      }
      if (status == "Refund") {
        return "pink darken-1";
      }
    },
    editItem(id) {
      this.orderDialog = !this.orderDialog;
      this.$store.dispatch("order/orderDetail", id);
      this.resetValidation();
      this.orderId = id;
      this.input.orderTransactionId = "";
      this.input.trackingNumber = "";
      this.input.courier = "";

      this.$restrictApi
        .get("/orders/" + id)
        .then((res) => {
          console.log(res.data);
          this.input.orderTransactionId = res.data.order_transaction_id;
          this.input.trackingNumber = res.data.order_tracking_no;
          this.input.courier = res.data.order_courier;
        })
        .catch((err) => {
          console.log(err.resonse.data.message);
          alert("Unable connect API");
        });
    },
    closeDialog() {
      this.orderDialog = false;
    },
    viewItem(transactionId) {
      return alert(transactionId);
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
        "Sep",
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
    resetValidation() {
      this.rules.trackingNumber = [];
      this.rules.courier = [];
    },
  },
  mounted() {
    this.showOrders();
  },
};
</script>

<style>
</style>