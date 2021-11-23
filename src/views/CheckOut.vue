<template>
  <v-app>
    <v-row class="text">
      <v-col cols="12" md="7" xl="7" class="pt-10">
        <div class="d-flex justify-center my-5">
          <v-avatar class="mr-10" color="grey darken-1" size="70" tile>
            <img :src="require('../assets/image/Dzoel shop.png')" alt="" link />
          </v-avatar>
        </div>
        <FormCheckout />
      </v-col>
      <v-col cols="12" md="5" xl="5" class="grey lighten-4 pt-10">
        <CartItemsTotal />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import FormCheckout from "../components/Checkout/FormCheckout.vue";
import CartItemsTotal from "../components/Checkout/CartItemsTotal.vue";
export default {
  title: "My Shop - Check Out",
  components: {
    FormCheckout,
    CartItemsTotal,
  },
};
</script>

<style>
</style>