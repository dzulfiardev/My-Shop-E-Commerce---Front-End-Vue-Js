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
              :src="product.product_image_url"
              class="product_image_home"
            ></v-img>
          </router-link>

          <v-card-title
            class="product_title"
            style="line-height: 1 !important; font-size: 15px !important"
          >
            {{ product.product_name }}
          </v-card-title>

          <v-container style="margin-top: -25px !important">
            <v-row align="center">
              <v-col cols="12" md="4">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="16"
                ></v-rating>
              </v-col>
              <v-col cols="12" md="6" class="hidden-sm-and-down">
                <div class="grey--text ms-4" style="font-size: 15px">
                  4.5 (413)
                </div>
              </v-col>
              <v-col cols="12" md="6" class="hidden-sm-and-up">
                <div
                  class="grey--text"
                  style="font-size: 15px; margin-top: -25px"
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
</template>

<script>
export default {
  props: ["products"],
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