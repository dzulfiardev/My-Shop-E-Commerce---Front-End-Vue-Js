<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    class="paralax_"
  >
    <v-container class="section001">
      <v-row align="center">
        <v-col
          cols="12"
          sm="12"
          md="8"
          class="my-10"
          :align="$vuetify.breakpoint.xs ? 'center' : 'left'"
        >
          <h1
            class="
              font-weight-bold
              mt-5 mt-sm-2
              text-body-3 text-sm-h3 text-md-h3 text-lg-h3 text-xl-h3
            "
            v-text="heading2"
            style="letter-spacing: 1.4px !important; line-height: 1.2"
            align="left"
          ></h1>

          <img
            class="hero_img hidden-md-and-up"
            :src="require('../../assets/image/hero_picture.png')"
            alt=""
          />

          <h1
            class="transition-swing text-body-2 text-md-body-1 mt-10"
            style="letter-spacing: 2px !important"
            align="left"
          >
            {{ heading }}
            <router-link to="/login" style="color: white; font-size: 20px"
              ><b>Click here to login as the admin</b></router-link
            >
          </h1>

          <div align="left">
            <v-btn
              depressed
              color="error"
              class="text-capitalize mt-8"
              to="/category/all-products"
            >
              Shop Now
            </v-btn>
          </div>
        </v-col>

        <v-col cols="4" md="4" class="hidden-sm-and-down">
          <img
            class="hero_img"
            :src="require('../../assets/image/hero_picture.png')"
            alt=""
          />
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  name: "HeroSection",
  data: () => ({
    heading2: "20% Off For First Electronics Purchase",
    heading:
      "THIS SITE IS FAKE just for showcase, the website made with Vue.Js 2.6(Front End) & Laravel 8(Back End).",
  }),
};
</script>


<style>
.section001 .ls_2 {
  letter-spacing: 1.5px !important;
}
.hero_img {
  width: 100%;
  position: relative;
  animation-name: up_down;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.paralax_ {
  height: fit-content !important;
}

@keyframes up_down {
  0% {
    bottom: 0px;
    top: 0px;
  }
  50% {
    bottom: 20px;
  }
  100% {
    top: 20px;
  }
}
</style>