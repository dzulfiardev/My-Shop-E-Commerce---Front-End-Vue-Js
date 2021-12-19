<template>
  <div>
    <div class="d-flex">
      <h1 class="text-capitalize">{{ categoryHeading }}</h1>
      <!-- <v-progress-circular
        indeterminate
        color="primary"
        class="mt-2 ml-2"
        v-if="headingProgress"
      ></v-progress-circular> -->
    </div>
    <v-row class="mt-2">
      <v-col
        cols="6"
        md="4"
        v-for="product in categoryProduct"
        :key="product.id"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            class="mx-auto"
            :elevation="hover ? 16 : 3"
            max-width="344"
          >
            <router-link :to="'/product-detail/' + product.product_slug">
              <v-img
                :src="product.product_image_url"
                class="product_image"
              ></v-img>
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

            <div class="d-flex" style="margin-top: -15px">
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
export default {
  props: [
    "categoryProduct",
    "skeletonLoader",
    "categoryHeading",
    "headingProgress",
  ],
  data() {
    return {};
  },
};
</script>

<style>
.product_image {
  height: 180px;
}

@media (max-width: 769) {
  .product_image {
    height: 250px;
  }
}

@media (max-width: 600px) {
  .product_image {
    height: 140px;
  }
}
</style>