<template>
  <v-app>
    <Navbar2 :loggedIn="loggedIn" />
    <v-main class="white mt-10">
      <v-container id="scrolling-techniques-7">
        <v-row>
          <v-col cols="12" md="3" class="hidden-sm-and-down">
            <HomeSidebar />
          </v-col>
          <v-col cols="12" md="9" class="categories_section">
            <ProductByCategory />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Bottom navigation -->
    <BottomNavigation class="hidden-sm-and-up" :loggedIn="loggedIn" />

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>
import Navbar2 from "../components/Navbar/Navbar2.vue";
import HomeSidebar from "../components/HomePage/HomeSidebar.vue";
import ProductByCategory from "../components/Category/ProductByCategory.vue";
import BottomNavigation from "../components/HomePage/BottomNavigation.vue";
import Footer from "../components/Footer/Footer.vue";

import { mapGetters } from "vuex";

export default {
  title: "Category - My Shop",
  components: {
    Navbar2,
    HomeSidebar,
    ProductByCategory,
    BottomNavigation,
    Footer,
  },
  computed: {
    ...mapGetters("auth", {
      loggedIn: "loginState",
    }),
  },
};
</script>

<style>
</style>