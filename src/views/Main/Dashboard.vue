<template>
  <v-app>
    <Navigation />
    <v-main>
      <v-container fluid class="px-10">
        <h1>Dashboard</h1>
        <v-row class="mt-5">
          <UserTotalCard />
          <ProductTotalCard />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../../components/Main/Navigation.vue";
import UserTotalCard from "../../components/Main/Dashboard/UserTotalCard.vue";
import ProductTotalCard from "../../components/Main/Dashboard/ProductTotalCard.vue";

export default {
  title: "Dashboard - My Shop",
  components: {
    Navigation,
    UserTotalCard,
    ProductTotalCard,
  },
};
</script>

<style>
</style>