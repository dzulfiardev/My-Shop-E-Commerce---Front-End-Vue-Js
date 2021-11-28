<template>
  <div class="product_section">
    <v-container>
      <h1>
        <v-icon size="35" color="primary darken-5">mdi-devices</v-icon> Products
      </h1>
      <SkeletonLoader v-if="productsLoader" :loop="8" />
      <ProductCard v-else :products="products" />
      <div class="mt-10 d-flex justify-center">
        <v-btn
          x-large
          width="200px"
          class="text-capitalize"
          color="primary"
          dark
          to="/category/all-products"
          >More</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import SkeletonLoader from "../Loader/SkeletonLoader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductCard,
    SkeletonLoader,
  },
  computed: {
    ...mapGetters("product", {
      products: "getProductGuest",
      productsLoader: "getProductGuestLoader",
    }),
  },
  mounted() {
    this.$store.dispatch("product/allProductGuest");
  },
};
</script>

<style>
.product_section {
  background-color: #ffffff;
  min-height: 60vh;
  padding: 50px 0;
}
</style>