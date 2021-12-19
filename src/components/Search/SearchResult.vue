<template>
  <div>
    <h1 v-if="webSearch.length == 0">
      Search result for: {{ this.$route.params.keyword }}
      <span>Not found!</span>
    </h1>
    <h1 v-else>Search result for: {{ this.$route.params.keyword }}</h1>
    <SkeletonLoader v-if="webSearchLoader" :loop="8" />
    <v-row v-else class="mt-2">
      <v-col cols="6" md="4" v-for="product in webSearch" :key="product.id">
        <v-hover v-slot="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            class="mx-auto"
            :elevation="hover ? 16 : 3"
            max-width="344"
          >
            <router-link :to="'/product-detail/' + product.product_slug">
              <v-img :src="product.product_image_url" height="200px"></v-img>
            </router-link>

            <v-card-title
              class="product_title"
              :style="
                $vuetify.breakpoint.xs
                  ? 'line-height: 1 !important; font-size: 12px !important'
                  : 'line-height: 1 !important; font-size: 15px !important'
              "
            >
              {{ product.product_name }}
            </v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  :size="$vuetify.breakpoint.xs ? '13' : '17'"
                ></v-rating>
                <div
                  class="grey--text ms-4"
                  :style="
                    $vuetify.breakpoint.xs
                      ? 'font-size: 12px; margin-left: 1px !important'
                      : 'font-size: 15px'
                  "
                >
                  4.5 (219)
                </div>
              </v-row>
            </v-card-text>

            <div class="d-flex" style="margin-top: -18px">
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
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SkeletonLoader from "../Loader/SkeletonLoader.vue";
export default {
  props: ["webSearch", "webSearchLoader"],
  components: {
    SkeletonLoader,
  },
  data() {
    return {
      resultTitle: "Search result for: " + this.$route.params.keyword,
      notFoundTitle:
        "Search result for: " + this.$route.params.keyword + " Not found!",
    };
  },
};
</script>

<style>
</style>