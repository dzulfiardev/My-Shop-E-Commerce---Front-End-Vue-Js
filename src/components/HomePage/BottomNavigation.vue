<template>
  <!-- Bottom Navigation -->
  <div>
    <v-bottom-navigation
      color="primary"
      absolute
      elevation="3"
      scroll-threshold="200"
      style="position: fixed"
      class="d-flex py-2"
    >
      <div>
        <v-btn value="recent">
          <span>Categories</span>
          <v-icon>mdi-shape</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn to="/login" v-if="!loggedIn">
          <span>Account</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn to="/dashboard" v-else>
          <span>Dashboard</span>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </div>

      <div>
        <v-badge :content="cartCount" overlap color="red" align="center">
          <v-btn @click.stop="drawer = !drawer">
            <span>Cart</span>
            <v-icon>mdi-cart-variant</v-icon>
          </v-btn>
        </v-badge>
      </div>
    </v-bottom-navigation>

    <!-- Cart Drawer -->
    <v-navigation-drawer
      absolute
      temporary
      right
      width="90%"
      height="100vh"
      style="position: fixed"
      v-model="drawer"
    >
      <CartDrawer
        :cartItems="cartItems"
        :cartCount="cartCount"
        @closeDrawer="closeDrawer"
        @removeItemCart="removeItemCart"
      />

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary" class="text-capitalize mt-2"
            >Checkout Now (${{ totalPrice }})</v-btn
          >
          <v-btn block dark class="text-capitalize mt-2" @click="emptyCart()">
            <v-icon> mdi-delete-empty </v-icon> Empty Cart
          </v-btn>
        </div>
      </template>
      <!-- End Cart Items -->
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartDrawer from "../Navbar/CartDrawer.vue";

export default {
  props: ["loggedIn"],
  components: {
    CartDrawer,
  },
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    ...mapGetters("cart", {
      cartCount: "getCartItemsCount",
      cartItems: "getCartItems",
      totalPrice: "getTotalPrice",
    }),
  },
  methods: {
    emptyCart() {
      return this.$store.dispatch("cart/emptyCart");
    },
    removeItemCart(index) {
      return this.$store.dispatch("cart/removeItemCart", index);
    },
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>

<style>
</style>