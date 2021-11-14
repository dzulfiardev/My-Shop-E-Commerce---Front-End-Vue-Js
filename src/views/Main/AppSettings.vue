<template>
  <v-app>
    <Navigation />
    <v-main>
      <v-container>
        <h1>App Settings</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../../components/Main/Navigation.vue";

export default {
  title: "App Settings - My Shop",
  components: {
    Navigation,
  },
};
</script>

<style>
</style>