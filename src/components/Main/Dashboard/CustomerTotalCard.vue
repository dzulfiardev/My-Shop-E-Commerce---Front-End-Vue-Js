<template>
  <v-col col="12" md="3">
    <v-card
      class="mx-auto"
      color="#EF5350"
      max-width="344"
      outlined
      elevation="4"
      dark
      to="/dashboard"
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
export default {
  data() {
    return {
      title: "Customers",
      icon: "mdi-account-cash-outline",
      count: 0,
    };
  },
  methods: {
    customerCount() {
      this.$restrictApi
        .get("/customers")
        .then((res) => {
          this.count = res.data.length;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mounted() {
    this.customerCount();
  },
};
</script>

<style>
</style>