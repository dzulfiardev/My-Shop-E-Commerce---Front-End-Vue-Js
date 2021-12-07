<template>
  <v-col col="12" md="3">
    <v-card
      class="mx-auto"
      color="#385F73"
      max-width="344"
      outlined
      elevation="4"
      dark
      to="/user-management"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            {{ title }}
          </v-list-item-title>

          <v-list-item-title v-if="count" class="text-h3 mb-1">
            {{ count }}
          </v-list-item-title>
          <div class="text-left" v-else>
            <v-progress-circular
              :size="30"
              color="white"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-list-item-content>

        <v-icon size="60"> {{ icon }} </v-icon>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "User Account",
      icon: "mdi-account",
    };
  },
  computed: {
    ...mapGetters("auth", {
      count: "getUserCount",
    }),
  },
  mounted() {
    this.$store.dispatch("auth/userCount");
  },
};
</script>

<style>
</style>