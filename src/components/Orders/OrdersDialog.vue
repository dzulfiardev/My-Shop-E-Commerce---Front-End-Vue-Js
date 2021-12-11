<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="900"
    v-model="orderDialog"
  >
    <v-overlay :value="loadingOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card>
      <v-toolbar color="primary" dark
        >Orders ID:<b class="ml-2">{{ orderTransactionId }}</b></v-toolbar
      >
      <v-container>
        <v-simple-table
          fixed-header
          class="my-5"
          style="border: 1px solid #e0e0e0"
        >
          <template v-slot:default>
            <thead>
              <tr class="grey lighten-2">
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody v-if="orderDetail">
              <tr v-for="(detail, index) in orderDetail" :key="index">
                <td>
                  <v-row>
                    <v-col cols="12" md="3">
                      <img
                        contain
                        :src="detail.product_image_url"
                        :alt="detail.product_name"
                        class="my-2"
                        style="height: 70px; width: 80px"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex align-center">
                      <p class="hidden-sm-and-down">
                        {{ detail.product_name }}
                      </p>
                      <p class="hidden-sm-and-up" style="margin-top: -20px">
                        {{ detail.product_name }}
                      </p>
                    </v-col>
                  </v-row>
                </td>
                <td>{{ detail.orders_detail_quantity }}</td>
                <td>{{ formatCurrency(detail.product_price) }}</td>
                <td>
                  <b
                    >${{ formatCurrency(detail.orders_detail_total_amount) }}</b
                  >
                </td>
              </tr>
            </tbody>

            <tbody v-if="!orderDetail.length">
              <tr>
                <td colspan="4">
                  <v-progress-circular
                    :size="70"
                    class="my-5 mx-auto d-flex justify-center"
                    color="primary"
                    indeterminate
                  >
                    Wait
                  </v-progress-circular>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-card elevation="4">
          <v-form ref="form" @submit.prevent="updateOrder()">
            <v-card-title>Shipment</v-card-title>
            <v-divider></v-divider>
            <v-row class="px-5">
              <v-col cols="12" md="6">
                <v-subheader><b>Tracking Number</b></v-subheader>
                <v-text-field
                  outlined
                  dense
                  solo
                  label="Tracking No."
                  elevation="0"
                  :rules="rules.trackingNumber"
                  v-model="input.trackingNumber"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <span
                  :style="
                    $vuetify.breakpoint.xs ? 'margin-top: -40px!important' : ''
                  "
                >
                  <v-subheader><b>Courier</b></v-subheader>
                  <v-text-field
                    outlined
                    dense
                    solo
                    label="Courier Name"
                    elevation="0"
                    :rules="rules.courier"
                    v-model="input.courier"
                  ></v-text-field>
                </span>
              </v-col>
              <v-col cols="12">
                <v-card-actions class="d-flex justify-end">
                  <v-btn
                    v-if="!input.courier && !input.trackingNumber"
                    type="submit"
                    color="blue darken-1"
                    class="text-capitalize"
                    style="margin-top: -30px"
                    dark
                    large
                    >Deliver</v-btn
                  >
                  <v-btn
                    v-else
                    type="submit"
                    color="blue darken-1"
                    class="text-capitalize"
                    style="margin-top: -30px"
                    dark
                    large
                    >Update</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>

      <v-divider class="mt-5"></v-divider>

      <v-card-actions class="justify-end">
        <v-btn dark @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: [
    "orderDialog",
    "orderDetail",
    "orderTransactionId",
    "input",
    "rules",
    "orderId",
  ],
  data() {
    return {
      loadingOverlay: false,
    };
  },
  methods: {
    formatCurrency(price) {
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    updateOrder() {
      this.loadingOverlay = true;
      let form = new FormData();
      form.append("order_id", this.orderId);
      form.append(
        "tracking_no",
        this.input.trackingNumber ? this.input.trackingNumber : ""
      );
      form.append(
        "courier",
        this.input.courier ? this.input.trackingNumber : ""
      );

      this.$restrictApi
        .post("/deliver-order", form)
        .then((res) => {
          console.log(res.data);
          this.closeDialog();
          this.$emit("showOrders");
          this.loadingOverlay = false;
          Swal.fire("Success!", res.data.success, "success");
        })
        .catch((err) => {
          console.log(err.response.data);
          this.loadingOverlay = false;
          const error = err.response.data.error;
          if (error) {
            this.$refs.form.validate(true);
            this.rules.trackingNumber = error.tracking_no;
            this.rules.courier = error.courier;
          }
        });
    },
    closeDialog() {
      this.$emit("closeDialog");
      this.resetValidation();
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.validate(false);
    },
    resetValidation() {
      this.rules.trackingNumber = [];
      this.rules.courier = [];
    },
  },
};
</script>

<style>
</style>