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
        <v-btn to="/">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn @click="openCategoryDrawer()">
          <span>Categories</span>
          <v-icon>mdi-shape</v-icon>
        </v-btn>
      </div>

      <div>
        <!-- <v-btn to="/login" v-if="!loggedIn">
          <span>Account</span>
          <v-icon>mdi-account</v-icon>
        </v-btn> -->
        <v-btn to="/dashboard" v-if="loggedIn">
          <span>Dashboard</span>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </div>

      <div>
        <v-badge
          v-if="cartCount"
          :content="cartCount"
          overlap
          color="red"
          align="center"
        >
          <v-btn @click.stop="drawer = !drawer">
            <span>Cart</span>
            <v-icon>mdi-cart-variant</v-icon>
          </v-btn>
        </v-badge>
        <v-badge v-else content="0" overlap color="red" align="center">
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
          <v-btn
            block
            color="primary"
            class="text-capitalize mt-2"
            to="/checkout"
            >Checkout Now (${{ totalPrice }})</v-btn
          >
          <v-btn block dark class="text-capitalize mt-2" @click="emptyCart()">
            <v-icon> mdi-delete-empty </v-icon> Empty Cart
          </v-btn>
        </div>
      </template>
      <!-- End Cart Items -->
    </v-navigation-drawer>
    <!-- End Cart Drawer -->

    <!-- Categories Drawer -->
    <v-navigation-drawer
      absolute
      temporary
      left
      width="75%"
      height="100vh"
      style="position: fixed"
      v-model="categoryDrawer"
    >
      <CategoriesDrawer @showProductCategory="showProductCategory" />
    </v-navigation-drawer>
    <!-- End Categories Drawer -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartDrawer from "../Navbar/CartDrawer.vue";
import CategoriesDrawer from "../Navbar/CategoriesDrawer.vue";

export default {
  props: ["loggedIn"],
  components: {
    CartDrawer,
    CategoriesDrawer,
  },
  data() {
    return {
      drawer: null,
      categoryDrawer: false,
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
    openCategoryDrawer() {
      this.categoryDrawer = !this.categoryDrawer;
    },
    showProductCategory() {
      this.$emit("loadCategoryProduct");
    },
  },
};
</script>

<style>
</style>