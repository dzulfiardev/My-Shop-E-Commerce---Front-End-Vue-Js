<template>
  <v-app>
    <Navbar2 :loggedIn="loggedIn" />
    <v-main class="white mt-10">
      <v-container id="scrolling-techniques-7">
        <v-row>
          <v-col cols="12" md="3" class="hidden-sm-and-down">
            <HomeSidebar @loadCategoryProduct="loadCategoryProduct" />
          </v-col>
          <v-col cols="12" md="9" class="categories_section">
            <SearchResult
              :webSearch="webSearch"
              :webSearchLoader="webSearchLoader"
            />
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
import SearchResult from "../components/Search/SearchResult.vue";
import BottomNavigation from "../components/HomePage/BottomNavigation.vue";
import Footer from "../components/Footer/Footer.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Navbar2,
    HomeSidebar,
    SearchResult,
    BottomNavigation,
    Footer,
  },
  computed: {
    ...mapGetters("auth", {
      loggedIn: "loginState",
    }),
    ...mapGetters("product", {
      webSearch: "getWebSearch",
      webSearchLoader: "getWebSearchLoader",
    }),
  },
  methods: {
    loadCategoryProduct() {
      this.headingProgress = true;
      const params = this.$route.params.category_slug;

      if (this.$store.dispatch("product/categoryProduct", params)) {
        this.headingProgress = false;
        this.categoryHeading = params;
      }
    },
  },
};
</script>

<style>
</style>