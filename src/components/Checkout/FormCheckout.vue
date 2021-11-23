<template>
  <v-container style="max-width: 600px !important" class="text">
    <v-divider class="my-4"></v-divider>
    <h3 class="fw_400 open_sans">Contact Information</h3>
    <v-form ref="form">
      <v-row class="mt-3">
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            label="Email"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
      </v-row>

      <h3 class="fw_400 open_sans mt-3">Billing Information</h3>
      <v-row class="mt-3">
        <v-col cols="12" sm="6" md="6" xl="6">
          <v-text-field
            label="First Name"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6" xl="6">
          <v-text-field
            label="Last Name"
            outlined
            dense
            :style="
              $vuetify.breakpoint.xs
                ? 'font-size: 14px;margin-top: -30px'
                : 'font-size: 14px'
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="margin-top: -30px">
        <v-col cols="12">
          <v-text-field
            label="Company (optional)"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="margin-top: -30px">
        <v-col cols="12">
          <v-text-field
            label="Country/Region"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="margin-top: -30px">
        <v-col cols="12">
          <v-text-field
            label="State"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="margin-top: -30px">
        <v-col cols="12">
          <v-text-field
            label="Address"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="margin-top: -30px">
        <v-col cols="12" md="6">
          <v-text-field
            label="Zip Postal"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Appartement, suite, etc.(optional)"
            outlined
            dense
            :style="
              $vuetify.breakpoint.xs
                ? 'font-size: 14px;margin-top: -30px'
                : 'font-size: 14px'
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="margin-top: -30px">
        <v-col cols="12">
          <v-text-field
            label="Phone (Optional)"
            outlined
            dense
            style="font-size: 14px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        type="submit"
        x-large
        color="primary darken-2"
        class="text-capitalize open_sans"
        style="letter-spacing: 0.8px !important; font-size: 13px !important"
        >Continue to payment</v-btn
      >
    </v-form>
    <v-divider class="mt-15"></v-divider>
    <div class="d-flex flex-row mt-3">
      <router-link class="mx-1 sm_link" to="/">Refund Policy</router-link>
      <router-link class="mx-1 sm_link" to="/">Privacy Policy</router-link>
      <router-link class="mx-1 sm_link" to="/">Terms of Service</router-link>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>