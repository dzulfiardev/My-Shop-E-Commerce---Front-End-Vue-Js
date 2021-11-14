<template>
  <v-row class="mt-5">
    <v-col cols="6" md="3" v-for="product in products" :key="product.id">
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

          <v-card-title class="product_title">
            {{ product.product_name }}
          </v-card-title>

          <div class="d-flex">
            <v-card-subtitle class="price_title"
              >${{ product.product_price }}
            </v-card-subtitle>

            <v-spacer></v-spacer>

            <v-card-actions>
              <v-btn color="red darken-2" small dark>
                <v-icon>mdi-plus</v-icon> Cart
              </v-btn>
            </v-card-actions>
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
</style>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>