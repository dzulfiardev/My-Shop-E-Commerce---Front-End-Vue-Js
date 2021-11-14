<template>
  <v-row dense class="mt-5">
    <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
      <v-card>
        <v-img
          :src="card.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="225px"
        >
          <v-card-title v-text="card.title"></v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Laptop",
        src: require("../../assets/image/Product/Laptop.jpg"),
        flex: 12,
      },
      {
        title: "Smartphone",
        src: require("../../assets/image/Product/Smartphone.jpg"),
        flex: 6,
      },
      {
        title: "Smart Watch",
        src: require("../../assets/image/Product/Smartwatch.jpg"),
        flex: 6,
      },
    ],
  }),
};
</script>

<style>
</style>