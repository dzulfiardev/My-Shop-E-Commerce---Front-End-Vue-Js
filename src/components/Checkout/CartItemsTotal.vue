<template>
  <!-- Cart Items -->
  <v-container class="px-5">
    <v-row
      v-for="(item, index) in cartItems"
      :key="index"
      style="width: 500px !important"
    >
      <v-col cols="2">
        <img
          contain
          :src="item.image"
          :alt="item.name"
          style="height: 70px; width: 80px"
        />
      </v-col>
      <v-col cols="6">
        <div style="font-size: 15px">
          <p>
            <b>{{ item.name }}</b>
          </p>
        </div>
        <div style="margin-top: -20px !important">
          <small>{{ formatCurrency(item.price) }} x {{ item.quantity }}</small>
        </div>
      </v-col>
      <v-col cols="2">
        <div>
          <p class="red--text" style="font-size: 15px">
            <b>{{ formatCurrency(item.totalPrice) }}</b>
          </p>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>
    <v-row style="width: 500px !important">
      <v-col cols="12" sm="12" md="12">
        <v-row>
          <v-col cols="8">
            <v-text-field
              label="Discount Coupon"
              outlined
              style="font-size: 14px"
              v-model="couponCode"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn
              color="primary darken-2"
              class="text-capitalize"
              x-large
              @click="acceptCouponCode"
              >Apply</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="mb-4"></v-divider>
    <v-row style="width: 500px !important">
      <v-col cols="7">
        <p style="font-size: 20px">Total</p>
      </v-col>
      <v-col cols="5">
        <p>
          <span class="grey--text darken-3--text">USD </span>
          <span style="font-size: 25px">{{ formatCurrency(totalPrice) }}</span>
        </p>
      </v-col>
    </v-row>
  </v-container>
  <!-- End Cart Items -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      total: 0,
      couponCode: "",
    };
  },
  computed: {
    ...mapGetters("cart", {
      cartItems: "getCartItems",
      totalPrice: "getTotalPrice",
    }),
  },
  methods: {
    acceptCouponCode() {
      if (this.couponCode == "") {
        return alert("Please Insert Coupon Code");
      }
      if (this.couponCode != "FKjowfnsaldfnlasflasfj;a") {
        return alert("Wrong coupon code!");
      }
    },
    formatCurrency(price) {
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  mounted() {
    this.total = this.totalPrice;
  },
};
</script>

<style>
</style>