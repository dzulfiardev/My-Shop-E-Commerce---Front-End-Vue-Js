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
        md="3"
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
              style="line-height: 1 !important; font-size: 15px !important"
            >
              {{ product.product_name }}
            </v-card-title>

            <v-container style="margin-top: -25px !important">
              <v-row>
                <v-col cols="12" md="5">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="13"
                  ></v-rating>
                </v-col>
                <v-col cols="12" md="6" class="hidden-sm-and-down">
                  <div
                    class="grey--text ms-4"
                    style="font-size: 13px; margin-top: 2px"
                  >
                    4.5 (413)
                  </div>
                </v-col>
                <v-col cols="12" md="6" class="hidden-sm-and-up">
                  <div
                    class="grey--text"
                    style="font-size: 13px; margin-top: -25px"
                  >
                    4.5 (413)
                  </div>
                </v-col>
              </v-row>
            </v-container>

            <div class="d-flex" style="margin-top: -25px">
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