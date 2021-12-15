<template>
  <div>
    <v-app-bar
      app
      color="white"
      outlined
      absolute
      height="100%"
      style="position: fixed"
    >
      <v-container class="py-0 fill-height">
        <v-row align="center">
          <v-col cols="12" md="3" class="hidden-sm-and-down">
            <div>
              <router-link to="/">
                <v-avatar class="mr-10" color="grey darken-1" size="70" tile>
                  <img
                    :src="require('../../assets/image/Dzoel shop.png')"
                    alt=""
                    link
                  />
                </v-avatar>
              </router-link>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <v-form @submit.prevent="submitSearch">
              <div class="d-flex search_box">
                <v-spacer></v-spacer>
                <v-text-field
                  block
                  append-icon="mdi-magnify"
                  label="Searching for"
                  solo
                  outlined
                  dense
                  tile
                  fixed
                  class="search_bar"
                  align="center"
                  style="width: 100%"
                  v-model="searchKeyword"
                ></v-text-field>
                <v-btn
                  dark
                  color="primary"
                  class="search_button text-capitalize"
                  tile
                  @click="submitSearch"
                >
                  Search
                </v-btn>
              </div>
            </v-form>
          </v-col>

          <v-col md="3" class="hidden-sm-and-down" align="center">
            <div class="d-flex justify-end pl-5" align="right">
              <!-- <v-tooltip bottom v-if="!loggedIn">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    to="/login"
                  >
                    <v-icon dark> mdi-account </v-icon>
                  </v-btn>
                </template>
                <span>Login/Register</span>
              </v-tooltip> -->

              <v-tooltip bottom v-if="loggedIn">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    to="/dashboard"
                  >
                    <v-icon dark> mdi-view-dashboard </v-icon>
                  </v-btn>
                </template>
                <span>Dashboard</span>
              </v-tooltip>

              <v-badge
                :content="cartCount ? cartCount : '0'"
                overlap
                color="red"
              >
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  outlined
                  @click.stop="drawer = !drawer"
                >
                  <v-icon dark> mdi-cart-variant </v-icon>
                </v-btn>
              </v-badge>
            </div>
          </v-col>

          <!--  -->
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Cart Drawer -->
    <v-navigation-drawer
      absolute
      temporary
      right
      width="375"
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
  </div>
</template>

<script>
import CartDrawer from "./CartDrawer.vue";
import { mapGetters } from "vuex";

export default {
  props: ["loggedIn"],
  components: {
    CartDrawer,
  },
  data: () => ({
    links: ["Login/Register"],
    drawer: null,
    searchKeyword: "",
  }),
  computed: {
    ...mapGetters("cart", {
      cartCount: "getCartItemsCount",
      cartItems: "getCartItems",
      totalPrice: "getTotalPrice",
    }),
    ...mapGetters("product", {
      productResult: "getWebSearch",
      autoComplete: "getAutoComplete",
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
    submitSearch() {
      if (this.searchKeyword === "") {
        this.$router.push("/");
      } else {
        this.$store.dispatch("product/webSearch", this.searchKeyword);
        this.$router.push("/search/" + this.searchKeyword);
      }
    },
    webSearch() {
      this.$store.dispatch("product/autoComplete", this.searchKeyword);
    },
  },
};
</script>

<style>
.search_box {
  height: 40px !important;
}
.search_bar {
  display: absolute !important;
  height: 100% !important;
  border-top-left-radius: 25px !important;
  border-bottom-left-radius: 25px !important;
}
.search_button {
  height: 100% !important;
  border-top-right-radius: 25px !important;
  border-bottom-right-radius: 25px !important;
}
</style>