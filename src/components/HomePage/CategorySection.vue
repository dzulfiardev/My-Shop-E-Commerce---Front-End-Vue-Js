<template>
  <div class="category_section">
    <v-container>
      <h1>
        <v-icon size="35" color="primary">mdi-shape</v-icon> Top Categories
      </h1>
      <CategoryCard />
    </v-container>
  </div>
</template>

<script>
import CategoryCard from "./CategoryCard.vue";

export default {
  components: {
    CategoryCard,
  },
};
</script>

<style>
.category_section {
  background-color: #f6f6f6;
  min-height: 60vh;
  padding: 50px 0;
}
</style>