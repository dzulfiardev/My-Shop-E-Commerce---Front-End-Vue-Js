<template>
  <v-container>
    <v-subheader>Categories</v-subheader>
    <v-list rounded>
      <v-list-item-group v-model="selectedItem" color="blue">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          @click="$emit('showProductCategory')"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: ["categoryDrawer"],
  data: () => ({
    selectedItem: 1,
    items: [
      {
        text: "All Products",
        icon: "mdi-devices",
        link: "/category/all-products",
      },
      { text: "Laptop", icon: "mdi-laptop", link: "/category/laptop" },
      {
        text: "Smartphone",
        icon: "mdi-cellphone-text",
        link: "/category/smartphone",
      },
      {
        text: "Smartwatch",
        icon: "mdi-watch-variant",
        link: "/category/smartwatch",
      },
    ],
  }),
};
</script>

<style>
</style>