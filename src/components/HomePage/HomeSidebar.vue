<template>
  <v-sheet rounded="lg" elevation="3" height="100%">
    <v-list rounded>
      <v-list-item-group v-model="selectedItem" color="blue">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Laptop", icon: "mdi-laptop" },
      { text: "Smartphone", icon: "mdi-cellphone-text" },
      { text: "Monitor", icon: "mdi-television-guide" },
      { text: "Peripheral", icon: "mdi-memory" },
      { text: "Smartwatch", icon: "mdi-watch-variant" },
      { text: "TV", icon: "mdi-television-box" },
    ],
  }),
};
</script>

<style>
</style>