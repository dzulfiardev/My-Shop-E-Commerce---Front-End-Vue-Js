<template>
  <v-row class="mt-5">
    <v-col cols="6" md="3" v-for="product in products" :key="product.id">
      <v-hover v-slot="{ hover }">
        <v-card
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          :elevation="hover ? 16 : 3"
          max-width="344"
          style="padding-bottom: 0 !important"
        >
          <router-link :to="'/product-detail/' + product.product_slug">
            <v-img
              :src="imageUrl + product.product_image"
              class="product_image_home"
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
                    ? 'font-size: 12px; margin-left: 5px !important'
                    : 'font-size: 15px'
                "
              >
                4.5
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
</template>

<script>
export default {
  props: ["products"],
  data() {
    return {
      imageUrl: process.env.VUE_APP_ASSET_PRODUCT_IMG_URL,
    };
  },
};
</script>

<style>
.product_title {
  font-size: 17px !important;
}
.price_title {
  font-size: 16px !important;
  color: #0d47a1 !important;
  font-weight: 700 !important;
}
v-card:hover {
  transition: 350ms !important;
}

.product_image_home {
  height: 200px;
}

@media (max-width: 768) {
  .product_image_home {
    height: 250px;
  }
}

@media (max-width: 600px) {
  .product_image_home {
    height: 130px;
  }
}
</style>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>