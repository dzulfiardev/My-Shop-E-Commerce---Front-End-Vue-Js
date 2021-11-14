<template>
  <div class="product_section">
    <v-container>
      <h1><v-icon size="35" color="primary">mdi-devices</v-icon> Products</h1>
      <ProductCard :products="products" />
    </v-container>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters("product", {
      products: "getProductGuest",
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