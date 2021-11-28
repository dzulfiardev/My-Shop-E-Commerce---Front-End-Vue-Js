<template>
  <div>
    <!-- Overlay Proccess -->
    <v-overlay :value="overlayProcess">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-navigation-drawer v-model="drawer" app>
      <v-card class="pa-3" color="primary" tile>
        <v-avatar class="mr-10" color="grey darken-1" size="70" tile>
          <img
            :src="require('../../assets/image/Dzoel shop.png')"
            alt=""
            link
          />
        </v-avatar>
      </v-card>

      <v-list>
        <v-list-item style="margin-bottom: -15px">
          <v-list-item-avatar
            style="width: 70px !important; height: 70px !important"
          >
            <v-img :src="session.imageUrl"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item to="/profile">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ session.fullname }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ session.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- v-list -->
      <v-list nav dense>
        <v-list-item-group list-item-group v-model="selectedItem" link>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!--  -->
        </v-list-item-group>
        <!-- End v-list -->

        <!-- v-list-group -->
        <v-list-group
          v-for="item in items2"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.link"
            link
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- End v-list group -->

        <!-- Logout Menu -->
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- End logout -->

        <!--  -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Shop</v-toolbar-title>
    </v-app-bar>
    <!--  -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  data: () => ({
    overlayProcess: false,
    drawer: null,
    selectedItem: 0,
    items: [
      { text: "Dashboard", icon: "mdi-view-dashboard", link: "/dashboard" },
      { text: "Product", icon: "mdi-cart-arrow-down", link: "/product" },
      { text: "Profile", icon: "mdi-account", link: "/profile" },
    ],
    items2: [
      {
        action: "mdi-cog-outline",
        items: [
          { title: "App Settings", link: "/app-settings" },
          { title: "User Management", link: "/user-management" },
        ],
        title: "Settings",
      },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.overlayProcess = true;
      if (this.$router.push("/")) {
        this.overlayProcess = false;
      }
    },
  },
  computed: {
    ...mapGetters("auth", {
      session: "getUser",
    }),
  },
};
</script>

<style>
</style>