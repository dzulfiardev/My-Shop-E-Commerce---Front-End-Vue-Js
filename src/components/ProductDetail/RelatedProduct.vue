<template>
  <div class="mt-10">
    <h1>Related Product</h1>
    <v-sheet class="mx-auto mt-5">
      <v-slide-group multiple show-arrows>
        <v-slide-item
          v-for="product in products"
          :key="product.id"
          class="py-5"
        >
          <v-card class="mx-3" width="250">
            <router-link :to="'/product-detail/' + product.product_slug">
              <v-img :src="product.product_image_url" height="200px"></v-img>
            </router-link>
            <v-card-title
              class="product_title"
              style="line-height: 1 !important"
            >
              {{ product.product_name }}
            </v-card-title>

            <v-container class="d-flex" style="margin-top: -20px !important">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="16"
              ></v-rating>
              <div class="grey--text ms-4 mt-1" style="font-size: 15px">
                4.5 (413)
              </div>
            </v-container>

            <div class="d-flex" style="margin-top: -10px">
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
      model: null,
    };
  },
  computed: {
    ...mapGetters("product", {
      products: "getProductGuest",
    }),
  },
  mounted() {
    this.$store.dispatch("product/allProductGuest");
  },
  methods: {
    getProduct(slug) {
      console.log(slug);
      this.$router.push("/");
      setTimeout(() => {
        this.$router.push("/product-detail/" + slug);
      }, 500);
    },
  },
};
</script>

<style>
</style>