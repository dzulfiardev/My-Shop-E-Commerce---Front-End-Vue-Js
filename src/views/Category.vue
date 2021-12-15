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
            <SkeletonLoader v-if="categoryProductLoader" :loop="8" />
            <ProductByCategory
              v-else
              :categoryProduct="categoryProduct"
              :headingProgress="headingProgress"
              :skeletonLoader="skeletonLoader"
              :categoryHeading="categoryHeading"
              @loadingFalse="loadingFalse"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Bottom navigation -->
    <BottomNavigation
      class="hidden-sm-and-up"
      :loggedIn="loggedIn"
      @loadCategoryProduct="loadCategoryProduct"
    />

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
import SkeletonLoader from "../components/Loader/SkeletonLoader.vue";

import { mapGetters } from "vuex";

export default {
  title: "Category - My Shop",
  components: {
    Navbar2,
    HomeSidebar,
    ProductByCategory,
    BottomNavigation,
    Footer,
    SkeletonLoader,
  },
  data() {
    return {
      skeletonLoader: true,
      categoryHeading: "",
      headingProgress: true,
    };
  },
  computed: {
    ...mapGetters("auth", {
      loggedIn: "loginState",
    }),
    ...mapGetters("product", {
      categoryProduct: "getCategoryProduct",
      categoryProductLoader: "getCategoryProductLoader",
    }),
  },
  methods: {
    loadingFalse() {
      this.skeletonLoader = false;
    },
    loadCategoryProduct() {
      this.headingProgress = true;
      const params = this.$route.params.category_slug;

      if (this.$store.dispatch("product/categoryProduct", params)) {
        this.headingProgress = false;
        this.categoryHeading = params;
      }
    },
  },
  mounted() {
    this.loadCategoryProduct();
  },
};
</script>

<style>
</style>