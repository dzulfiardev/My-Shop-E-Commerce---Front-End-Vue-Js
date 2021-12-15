<template>
  <v-app>
    <Navbar />
    <v-container class="summary_container">
      <v-main class="white mt-7">
        <h4 class="grey--text">
          Transaction ID: {{ orderSummary.order_transaction_id }}
        </h4>
        <h1>Thank you for your Purchase</h1>
        <p>
          Your order will deliver soon, please check your email for the progress
        </p>
        <v-simple-table
          fixed-header
          class="mt-7"
          style="border: 1px solid #e0e0e0"
        >
          <template v-slot:default>
            <thead>
              <tr class="grey lighten-2">
                <th class="text-left head_title">Item</th>
                <th class="text-left head_title">Quantity</th>
                <th class="text-left head_title">Price</th>
                <th class="text-left head_title">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in orderSummary.products"
                :key="index"
              >
                <td>{{ product.product_name }}</td>
                <td>{{ product.pivot.orders_detail_quantity }}</td>
                <td>{{ formatCurrency(product.product_price) }}</td>
                <td>
                  {{
                    formatCurrency(
                      product.product_price *
                        product.pivot.orders_detail_quantity
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td colspan="3" class="order_total">Order Total</td>
                <td>
                  <span class="order_total"
                    ><b>{{
                      formatCurrency(orderSummary.order_grand_total)
                    }}</b></span
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn
          color="primary"
          class="mt-3 text-capitalize"
          align="center"
          x-large
          to="/"
          >Back</v-btn
        >
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar/Navbar2.vue";
import { mapGetters } from "vuex";

export default {
  title: "Summary - My Shop",
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters("order", {
      orderSummary: "getOrder",
      orderProducts: "getOrderProducts",
    }),
  },
  methods: {
    formatCurrency(price) {
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>

<style>
.summary_container {
  max-width: 800px;
}
.head_title {
  font-size: 19px !important;
}
.order_total {
  font-size: 23px !important;
}
</style>