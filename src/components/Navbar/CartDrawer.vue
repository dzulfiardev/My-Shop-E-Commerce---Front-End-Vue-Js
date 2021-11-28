<template>
  <div>
    <v-list-item>
      <v-row>
        <v-col cols="4">
          <v-list-item-icon align="left">
            <v-icon size="30">mdi-shopping-outline</v-icon>
          </v-list-item-icon>
        </v-col>

        <v-col cols="4">
          <v-list-item-content>
            <v-list-item-title
              align="center"
              class="d-flex align-center"
              style="margin-top: 8px; font-size: 18px"
            >
              {{ cartCount }} Items
            </v-list-item-title>
          </v-list-item-content>
        </v-col>

        <v-col cols="4">
          <v-list-item-content>
            <v-btn text align="right" @click="$emit('closeDrawer')">
              <v-icon dark> mdi-close-thick </v-icon>
            </v-btn>
          </v-list-item-content>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Cart Items -->
    <v-container>
      <v-row v-for="(item, index) in cartItems" :key="index">
        <v-col cols="4">
          <img
            contain
            :src="item.image"
            :alt="item.name"
            style="height: 70px; width: 100p%"
          />
        </v-col>
        <v-col cols="6">
          <div>
            <p>
              <b>{{ item.name }}</b>
            </p>
          </div>
          <div style="margin-top: -20px !important">
            <small>${{ item.price }} x {{ item.quantity }}</small>
          </div>
          <div>
            <p class="red--text">
              <b>${{ item.totalPrice }}</b>
            </p>
          </div>
        </v-col>
        <v-col cols="2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                dark
                color="red"
                outlined
                align="left"
                v-bind="attrs"
                v-on="on"
                style="width: 25px; height: 25px"
                @click="$emit('removeItemCart', index)"
              >
                <v-icon dark style="font-size: 14px"> mdi-close-thick </v-icon>
              </v-btn>
            </template>
            <span>Remove {{ item.name }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- End Cart Items -->
</template>

<script>
export default {
  props: ["cartItems", "cartCount"],
};
</script>

<style>
</style>