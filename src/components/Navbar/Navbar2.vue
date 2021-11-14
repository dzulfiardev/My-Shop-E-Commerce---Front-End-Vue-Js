<template>
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
          <div class="d-flex pl-5">
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

            <v-btn class="mx-2" fab dark small color="primary" outlined>
              <v-icon dark> mdi-cart-variant </v-icon>
            </v-btn>
          </div>
        </v-col>

        <!--  -->
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  props: ["loggedIn"],
  data: () => ({
    links: ["Login/Register"],
  }),
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