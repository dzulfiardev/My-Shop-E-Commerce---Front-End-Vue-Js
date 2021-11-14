<template>
  <div>
    <v-app-bar
      :class="$vuetify.breakpoint.xs ? 'px-2' : 'px-6'"
      elevate-on-scroll
      dark
      app
      absolute
      class="app-header"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-row>
          <v-col cols="3">
            <v-toolbar-title v-if="loggedIn" class="text--darken-2"
              >You has login</v-toolbar-title
            >
            <v-toolbar-title v-else class="text--darken-2"
              >My Shop</v-toolbar-title
            >
          </v-col>

          <v-col cols="6">
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>

          <v-divider vertical dark></v-divider>
          <v-col cols="3">
            <v-app-bar-nav-icon
              @click="drawer = true"
              class="hidden-md-and-up"
            ></v-app-bar-nav-icon>

            <div class="hidden-sm-and-down navigation"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-divider light></v-divider>

      <v-list v-if="loggedIn" nav dense>
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item to="/dashboard">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list v-else nav dense>
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item to="/login">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>

          <v-list-item to="/register">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  props: ["loggedIn"],
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      if (this.drawer) {
        this.drawer = false;
      }
    },
  },
};
</script>

<style>
</style>