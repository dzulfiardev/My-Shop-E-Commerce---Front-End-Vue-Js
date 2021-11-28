<template>
  <v-app>
    <v-row class="text">
      <v-col cols="12" md="7" xl="7" class="pt-10">
        <div class="d-flex justify-center my-5">
          <router-link to="/">
            <v-avatar color="grey darken-1" size="70" tile>
              <img :src="require('../assets/image/Dzoel shop.png')" alt="" />
            </v-avatar>
          </router-link>
        </div>
        <v-divider class="hidden-md-and-up"></v-divider>
        <CartItemsTotalMobile class="hidden-md-and-up px-7 mt-10" />
        <FormCheckout
          :input="input"
          @processPayment="processPayment"
          :paymentProcessing="paymentProcessing"
        />
      </v-col>
      <v-col cols="12" md="5" xl="5" class="grey lighten-4 pt-10">
        <CartItemsTotal class="hidden-sm-and-down mt-10" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import FormCheckout from "../components/Checkout/FormCheckout.vue";
import CartItemsTotal from "../components/Checkout/CartItemsTotal.vue";
import CartItemsTotalMobile from "../components/Checkout/CartItemsTotal.vue";
import { mapGetters } from "vuex";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "../plugins/axios.js";

export default {
  title: "My Shop - Check Out",
  components: {
    FormCheckout,
    CartItemsTotal,
    CartItemsTotalMobile,
  },
  data() {
    return {
      stripeKey:
        "pk_test_51HkIpuBtRQ1cyR7JRiBPomB43D6gEisa6Xd4tTs9nB4NjoOF6wIv9GaAna5OuZ3EDfQFtY9ToFBYddUuY6NKSAXf00GPfk8uUi",
      stripe: {},
      cardElement: {},
      input: {
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        country: "",
        state: "",
        city: "",
        address: "",
        zipCode: "",
        appartement: "",
        phone: "",
        payment_method_id: "",
        amount: "",
        cart: "",
      },
      cartItems: JSON.stringify(localStorage.getItem("cart")),
      paymentProcessing: false,
    };
  },
  computed: {
    ...mapGetters("cart", {
      totalPrice: "getTotalPrice",
    }),
  },
  methods: {
    async processPayment() {
      this.paymentProcessing = true;

      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        "card",
        this.cardElement,
        {
          billing_details: {
            name: this.input.firstName + " " + this.input.lastName,
            email: this.input.email,
            address: {
              line1: this.input.address,
              city: this.input.city,
              state: this.input.state,
              postal_code: this.input.zipCode,
            },
          },
        }
      );

      if (error) {
        this.paymentProcessing = false;
        alert(error);
      } else {
        this.input.payment_method_id = paymentMethod.id;
        this.input.amount = this.totalPrice;
        this.input.cart = this.cartItems;

        api
          .post("/purcase", this.input)
          .then((res) => {
            console.log(res);
            this.paymentProcessing = false;
            // this.$store.commit("updateOrder", res.data);
            // this.$store.dispatch('emptyCart');
            this.$router.push("/summary");
          })
          .catch((error) => {
            this.paymentProcessing = false;
            alert(error.response.data);
          });
      }
    },
    async loadElement() {
      this.stripe = await loadStripe(this.stripeKey);

      const elements = this.stripe.elements();
      this.cardElement = elements.create("card", {
        classes: {
          base: "outline",
        },
      });

      this.cardElement.mount("#cardElement");
    },
  },
  mounted() {
    this.loadElement();
  },
};
</script>

<style>
</style>