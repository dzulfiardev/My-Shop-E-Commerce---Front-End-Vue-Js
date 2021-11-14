<template>
  <v-app style="background-color: #e3f2fd !important">
    <!-- Overlay Proccess -->
    <v-overlay :value="overlayProcess">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container>
      <v-card
        shaped
        elevation="5"
        class="py-5 mt-15 mx-auto"
        max-width="400"
        border="top"
        colored-border
        type="info"
        style="border-top: 10px solid #1e88e5"
      >
        <v-card-title class="mx-auto ml-5">
          <h1>Register</h1>
        </v-card-title>

        <v-form @submit.prevent="handleRegister">
          <v-card-text>
            <v-text-field
              label="Email"
              prepend-icon="mdi-email"
              :rules="emailRules"
              v-model="user.email"
            />
            <v-text-field
              label="Username"
              prepend-icon="mdi-account"
              :rules="usernameRules"
              v-model="user.username"
            />
            <v-text-field
              label="Full Name"
              prepend-icon="mdi-account-circle"
              :rules="fullnameRules"
              v-model="user.fullname"
            />
            <v-text-field
              label="Password"
              :type="viewPass ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="
                viewPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              @click:append="passView"
              :rules="passRules"
              v-model="user.password"
            />
            <v-text-field
              label="Repeat Password"
              :type="viewPass ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="
                viewPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              @click:append="passView"
              :rules="passConfirmRules"
              v-model="user.password_confirm"
            />
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="px-5">
            <v-btn color="primary" type="submit" :disabled="isValid"
              >Register</v-btn
            >
            <v-btn color="success" to="/login">Have Account, Login</v-btn>
          </v-card-actions>
        </v-form>

        <v-list-item to="/">
          <v-list-item-content>
            <router-link style="text-decoration: none" to="/"
              >Back to Home Page</router-link
            >
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
// import axios from "axios";

export default {
  title: "Register - My Shop",
  data() {
    return {
      overlayProcess: false,
      viewPass: false,
      user: {
        email: "",
        username: "",
        fullname: "",
        password: "",
        password_confirm: "",
      },
      usernameRules: [(v) => !!v || "Username is required"],
      emailRules: [(v) => !!v || "Email is required"],
      fullnameRules: [(v) => !!v || "Full Name is required"],
      passRules: [(v) => !!v || "Password is required"],
      passConfirmRules: [(v) => !!v || "Password Confirm is required"],
      isValid: false,
    };
  },
  methods: {
    passView() {
      this.viewPass = !this.viewPass;
    },
    handleRegister() {
      this.isValid = true;
      this.overlayProcess = true;

      this.$api
        .post("register", {
          email: this.user.email,
          user_username: this.user.username,
          user_fullname: this.user.fullname,
          password: this.user.password,
          password_confirmation: this.user.password_confirm,
        })
        .then((res) => {
          console.log(res);
          this.overlayProcess = false;
          this.$store.dispatch("auth/successMsg", res.data.success);
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err.response.data);
          this.isValid = false;
          this.overlayProcess = false;
          this.emailRules = err.response.data.email;
          this.usernameRules = err.response.data.user_username;
          this.passRules = err.response.data.password;
        });
    },
  },
};
</script>

<style>
</style>