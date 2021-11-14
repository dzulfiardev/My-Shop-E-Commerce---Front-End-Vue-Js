<template>
  <v-app>
    <Navigation />
    <v-main>
      <v-container>
        <h1>Profile</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../../components/Main/Navigation.vue";

export default {
  title: "Profile - My Shop",
  components: {
    Navigation,
  },
};
</script>

<style>
</style>