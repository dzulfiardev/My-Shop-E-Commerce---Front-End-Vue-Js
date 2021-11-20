<template>
  <h1 class="text-capitalize">
    {{ heading }}
  </h1>
</template>

<script>
export default {
  data() {
    return {
      heading: this.$route.params.product_category,
    };
  },
};
</script>

<style>
</style>