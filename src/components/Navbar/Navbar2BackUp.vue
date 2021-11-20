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
          <v-col cols="2" md="3">
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

          <v-col cols="10" md="6">
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
              ></v-text-field>
              <v-btn
                dark
                color="primary"
                class="search_button text-capitalize"
                tile
              >
                Search
              </v-btn>
            </div>
          </v-col>

          <v-col md="3" class="hidden-sm-and-down" align="center">
            <div class="d-flex justify-end pl-5" align="right">
              <v-tooltip bottom v-if="!loggedIn">
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
              </v-tooltip>

              <v-tooltip bottom v-else>
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
      <v-list-item>
        <v-row>
          <v-col cols="4">
            <v-list-item-icon align="left">
              <v-icon size="30">mdi-shopping-outline</v-icon>
            </v-list-item-icon>
          </v-col>

          <v-col cols="4">
            <v-list-item-content>
              <v-list-item-title
                align="center"
                class="d-flex align-center"
                style="margin-top: 8px; font-size: 18px"
                >{{ cartCount }} Items</v-list-item-title
              >
            </v-list-item-content>
          </v-col>

          <v-col cols="4">
            <v-list-item-content>
              <v-btn text align="right" @click="closeDrawer()">
                <v-icon dark> mdi-close-thick </v-icon>
              </v-btn>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Cart Items -->
      <v-container>
        <v-row v-for="(item, index) in cartItems" :key="index">
          <v-col cols="4">
            <img
              contain
              :src="item.image"
              :alt="item.name"
              style="height: 70px; width: 100p%"
            />
          </v-col>
          <v-col cols="6">
            <div>
              <p>
                <b>{{ item.name }}</b>
              </p>
            </div>
            <div style="margin-top: -20px !important">
              <small>${{ item.price }} x {{ item.quantity }}</small>
            </div>
            <div>
              <p class="red--text">
                <b>${{ item.totalPrice }}</b>
              </p>
            </div>
          </v-col>
          <v-col cols="2">
            <v-tooltip bottom v-if="!loggedIn">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="red"
                  outlined
                  align="left"
                  v-bind="attrs"
                  v-on="on"
                  @click="removeItemCart(index)"
                >
                  <v-icon dark> mdi-close-thick </v-icon>
                </v-btn>
              </template>
              <span>Remove {{ item.name }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>

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

export default {
  props: ["loggedIn"],
  data: () => ({
    links: ["Login/Register"],
    drawer: null,
  }),
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