<template>
  <v-row class="mt-2">
    <v-col cols="6" md="3" v-for="index in loop" :key="index">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["loop"],
};
</script>

<style>
</style>