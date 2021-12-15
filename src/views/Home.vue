<template>
  <v-app>
    <!-- <Navbar :loggedIn="loggedIn" /> -->
    <Navbar2 :loggedIn="loggedIn" />
    <v-main class="white mt-5">
      <v-container id="scrolling-techniques-7">
        <v-row class="hidden-md-and-up">
          <v-col cols="12" align="center">
            <router-link to="/">
              <v-avatar class="mr-10" color="grey darken-1" size="100" tile>
                <img
                  :src="require('../assets/image/Dzoel shop.png')"
                  alt=""
                  link
                />
              </v-avatar>
            </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" class="hidden-sm-and-down">
            <HomeSidebar />
          </v-col>
          <v-col cols="12" md="9" class="hero_section">
            <HeroSection />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- Top Categories Sections -->
    <CategorySection />

    <!-- Product Section -->
    <ProductSection />

    <!-- Bottom Navigation -->
    <BottomNavigation class="hidden-md-and-up" :loggedIn="loggedIn" />

    <!-- Footer Section -->
    <Footer />

    <!-- </v-main> -->
  </v-app>
</template>

<script>
import Navbar2 from "../components/Navbar/Navbar2.vue";
import HeroSection from "../components/HomePage/HeroSection.vue";
import HomeSidebar from "../components/HomePage/HomeSidebar.vue";
import CategorySection from "../components/HomePage/CategorySection.vue";
import BottomNavigation from "../components/HomePage/BottomNavigation.vue";
import ProductSection from "../components/HomePage/ProductSection.vue";
import Footer from "../components/Footer/Footer.vue";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
  }),
  title: "Home - My Shop",
  components: {
    // Navbar,
    Navbar2,
    HeroSection,
    HomeSidebar,
    CategorySection,
    BottomNavigation,
    ProductSection,
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
