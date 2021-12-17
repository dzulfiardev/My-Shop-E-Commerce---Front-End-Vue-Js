<template>
  <!-- Cart Items -->
  <v-container class="px-5">
    <v-row v-for="(item, index) in cartItems" :key="index">
      <v-col cols="3">
        <img
          contain
          :src="item.image"
          :alt="item.name"
          style="height: 50px; width: 70px"
        />
      </v-col>
      <v-col cols="5">
        <div style="font-size: 15px">
          <p>
            <b>{{ item.name }}</b>
          </p>
        </div>
        <div style="margin-top: -20px !important">
          <small>{{ formatCurrency(item.price) }} x {{ item.quantity }}</small>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="d-flex flex-row-reverse">
          <p class="red--text" style="font-size: 15px">
            <b>{{ formatCurrency(item.totalPrice) }}</b>
          </p>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              label="Discount Coupon"
              outlined
              style="font-size: 14px"
              v-model="couponCode"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              color="primary darken-2"
              class="text-capitalize d-block"
              x-large
              @click="acceptCouponCode"
              style="margin-top: -30px"
              >Apply</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="8">
        <p style="font-size: 20px" class="mt-1">Total</p>
      </v-col>
      <v-col cols="4" class="d-flex flex-row-reverse">
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
        alert("Wrong coupon code!");
        this.couponCode = "";
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