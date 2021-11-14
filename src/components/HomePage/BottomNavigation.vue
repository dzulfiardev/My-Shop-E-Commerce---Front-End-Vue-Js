<template>
  <!-- Bottom Navigation -->
  <v-bottom-navigation
    color="primary"
    absolute
    elevation="3"
    scroll-threshold="200"
    style="position: fixed"
  >
    <v-btn value="recent">
      <span>Categories</span>
      <v-icon>mdi-shape</v-icon>
    </v-btn>

    <v-btn to="/login">
      <span>Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn>
      <span>Cart</span>
      <v-icon>mdi-cart-variant</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {};
</script>

<style>
</style>