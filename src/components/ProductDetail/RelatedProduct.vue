<template>
  <div class="mt-10">
    <h1>Related Product</h1>
    <v-sheet class="mx-auto mt-5">
      <v-slide-group multiple show-arrows>
        <v-slide-item
          v-for="product in getRelatedProduct"
          :key="product.id"
          class="py-5"
        >
          <v-card
            class="mx-3 my-2"
            width="250"
            style="height: fit-content !important; padding-bottom: 0 !important"
          >
            <v-img
              :src="imageUrl + product.product_image"
              height="200px"
              style="cursor: pointer"
              @click="getProduct(product.product_slug)"
            ></v-img>
            <v-card-title
              class="product_title"
              style="line-height: 1 !important; font-size: 16px !important"
            >
              {{ product.product_name }}
            </v-card-title>

            <v-container class="d-flex" style="margin-top: -25px !important">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="15"
              ></v-rating>
              <div class="grey--text ms-4 mt-1" style="font-size: 14px">
                4.5 (413)
              </div>
            </v-container>

            <div class="d-flex" style="margin-top: -20px">
              <v-card-subtitle class="price_title"
                >${{ product.product_price }}
              </v-card-subtitle>

              <v-spacer></v-spacer>

              <!-- <v-card-actions>
              <v-btn color="red darken-2" small dark>
                <v-icon>mdi-plus</v-icon> Cart
              </v-btn>
            </v-card-actions> -->
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      imageUrl: process.env.VUE_APP_ASSET_PRODUCT_IMG_URL,
      model: null,
    };
  },
  props: ["getRelatedProduct"],
  computed: {
    ...mapGetters("product", {
      products: "getProductGuest",
    }),
  },
  mounted() {
    this.$emit("loadDetailProduct");
    this.$store.dispatch("product/allProductGuest");
  },
  methods: {
    getProduct(slug) {
      this.$router.push("/product-detail/" + slug);
      this.$emit("loadDetailProduct");
    },
  },
};
</script>

<style>
</style>