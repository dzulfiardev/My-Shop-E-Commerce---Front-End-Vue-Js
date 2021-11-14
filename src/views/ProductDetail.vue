<template>
  <v-app>
    <Navbar2 />
    <v-main class="white">
      <v-container id="scrolling-techniques-7">
        <v-row>
          <v-col cols="12" md="12" min-height="30vh">
            <v-container>
              <h1>Product Detail</h1>
              <ul>
                <li>
                  <img :src="product.product_image_url" width="300px" alt="" />
                </li>
                <li>{{ product.product_name }}</li>
                <li>{{ product.product_price }}</li>
              </ul>
              <div class="mt-5">{{ product.product_content }}</div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar2 from "../components/Navbar/Navbar2.vue";

export default {
  components: {
    Navbar2,
  },
  data() {
    return {
      product: "",
    };
  },
  mounted() {
    this.$api
      .get("/detail-product/" + this.$route.params.product_slug)
      .then((res) => {
        console.log(res);
        this.product = res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
};
</script>

<style>
</style>