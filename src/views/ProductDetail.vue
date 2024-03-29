<template>
  <v-app>
    <Navbar2 :loggedIn="loggedIn" />
    <v-main class="white">
      <v-container id="scrolling-techniques-7">
        <v-row>
          <v-col cols="12" md="12" min-height="30vh">
            <v-container>
              <v-row class="mt-5">
                <v-col cols="12" sm="6" md="6">
                  <v-img
                    contain
                    max-height="350"
                    :lazy-src="imageUrl + product.product_image"
                    :src="imageUrl + product.product_image"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pt-5">
                  <h1 class="title_detail">{{ product.product_name }}</h1>
                  <div class="d-flex mt-5">
                    <p class="grey--text darken-4">Vendor:</p>
                    <p class="px-2">
                      <b>{{ product.product_vendor }}</b>
                    </p>
                  </div>
                  <div class="d-flex">
                    <p class="grey--text darken-4">Stock:</p>
                    <p class="px-2">
                      <b>{{ productQty }}</b>
                    </p>
                  </div>
                  <div class="d-flex">
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="20"
                    ></v-rating>

                    <div class="grey--text ms-4">4.5 (413)</div>
                  </div>
                  <div class="mt-5">
                    <h1 class="red--text">
                      <b>${{ product.product_price }}.00</b>
                    </h1>
                  </div>
                  <div v-if="product.product_quantity != 0">
                    <p>Stock Available</p>
                  </div>
                  <div v-if="product.product_quantity == 0">
                    <p>Stock Unavailable</p>
                  </div>

                  <div
                    class="d-flex justify-space-between"
                    style="width: 130px"
                  >
                    <v-btn
                      fab
                      dark
                      small
                      color="red"
                      outlined
                      align="left"
                      @click="countMinus"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <p style="font-size: 25px">
                      <b>{{ cartQty }}</b>
                    </p>
                    <v-btn
                      fab
                      dark
                      small
                      color="red"
                      outlined
                      align="left"
                      @click="countPlus"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>

                  <div align="left">
                    <v-btn
                      depressed
                      color="error"
                      class="text-capitalize mt-2"
                      :disabled="productQty != 0 ? false : true"
                      @click="
                        addToCart(product.product_slug, product.product_name)
                      "
                    >
                      Add to Cart
                    </v-btn>
                  </div>
                </v-col>
              </v-row>

              <!-- Product Specification -->
              <v-row class="mt-15">
                <v-col cols="12" md="6">
                  <h1>Specification</h1>
                  <div class="mt-5">
                    <p v-html="content"></p>
                  </div>
                </v-col>
              </v-row>

              <!-- Related product -->
              <SkeletonLoader v-if="relatedProductLoader" :loop="4" />
              <RelatedProduct
                v-else
                @loadDetailProduct="loadDetailProduct"
                :getRelatedProduct="getRelatedProduct"
              />
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
    <BottomNavigation :loggedIn="loggedIn" class="hidden-sm-and-up" />
  </v-app>
</template>

<script>
import Navbar2 from "../components/Navbar/Navbar2.vue";
import RelatedProduct from "../components/ProductDetail/RelatedProduct.vue";
import Footer from "../components/Footer/Footer.vue";
import BottomNavigation from "../components/HomePage/BottomNavigation.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import SkeletonLoader from "../components/Loader/SkeletonLoader.vue";

export default {
  title: "My Shop | Product Detail",
  components: {
    Navbar2,
    Footer,
    BottomNavigation,
    RelatedProduct,
    SkeletonLoader,
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_ASSET_PRODUCT_IMG_URL,
      isValid: false,
      product: "",
      getProduct: {},
      content: "",
      productQty: 0,
      cartQty: 1,
      cart: [],
      getRelatedProduct: "",
      relatedProductLoader: true,
    };
  },
  methods: {
    addToCart(slug, name) {
      this.$store.dispatch("cart/addToCart", {
        slug: slug,
        cartQty: this.cartQty,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are add " + name + " on cart",
        showConfirmButton: false,
        timer: 1500,
      });
      this.cartQty = 1;
    },
    countPlus() {
      this.cartQty += 1;
    },
    countMinus() {
      if (this.cartQty <= 1) {
        return false;
      } else {
        this.cartQty -= 1;
      }
    },
    loadDetailProduct() {
      this.$api
        .get("/detail-product/" + this.$route.params.product_slug)
        .then((res) => {
          this.product = res.data;
          this.productQty = res.data.product_quantity;
          this.content = res.data.product_content;
          this.relatedProductByCategory(res.data.category_id, res.data.id);
          this.relatedProductLoader = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      window.scroll(0, 0);
    },
    relatedProductByCategory(categoryId, currentProductId) {
      this.$api
        .get("/related-product/" + categoryId + "/" + currentProductId)
        .then((res) => {
          this.getRelatedProduct = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mounted() {
    this.loadDetailProduct();
  },
  computed: {
    ...mapGetters("auth", {
      loggedIn: "loginState",
    }),
  },
};
</script>

<style>
.swal2-popup {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
}
@media (max-width: 600px) {
  .title_detail {
    font-size: 24px;
  }
}
</style>