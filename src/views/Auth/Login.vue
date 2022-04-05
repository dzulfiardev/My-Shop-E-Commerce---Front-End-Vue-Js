<template>
  <v-app style="background-color: #e3f2fd !important">
    <!-- Overlay Proccess -->
    <v-overlay :value="overlayProcess">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container>
      <v-alert
        border="left"
        elevation="3"
        type="success"
        dismissible
        v-if="successMsg"
      >
        {{ successMsg }}
      </v-alert>

      <v-alert
        border="left"
        type="error"
        dismissible
        transition="slide-y-transition"
        v-if="errMsg"
      >
        {{ errMsg }}
      </v-alert>

      <v-card
        shaped
        elevation="5"
        class="py-5 mt-15 mx-auto"
        max-width="400"
        border="top"
        colored-border
        type="info"
        style="border-top: 10px solid #1e88e5"
        :loading="loading"
      >
        <v-card-title class="mx-auto ml-5">
          <h1>Login</h1>
        </v-card-title>

        <v-form @submit.prevent="handleLogin">
          <v-card-text>
            <v-text-field
              label="Email"
              prepend-icon="mdi-account-circle"
              :rules="emailRules"
              v-model="user.email"
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
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="px-5">
            <v-btn color="primary" type="submit" :disabled="isValid"
              >Login</v-btn
            >
            <v-btn color="success" @click="disableRegister">Register</v-btn>
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
import { mapGetters } from "vuex";

export default {
  title: "Login - My Shop",
  data() {
    return {
      loading: false,
      overlayProcess: false,
      viewPass: false,
      user: {
        email: "user@email.com",
        password: "testtest",
      },
      emailRules: [(v) => !!v || "E-mail is required"],
      passRules: [(v) => !!v || "Password is required"],
      isValid: false,
      errMsg: "",
      expiresMs: null,
    };
  },
  methods: {
    passView() {
      this.viewPass = !this.viewPass;
    },
    handleLogin() {
      this.overlayProcess = true;
      this.isValid = true;

      this.$api
        .post("login", {
          email: this.user.email,
          password: this.user.password,
        })
        .then((res) => {
          this.overlayProcess = false;
          this.isValid = false;

          this.expiresMs = res.data.expires * 500; //automated logout in 30 minutes
          const now = new Date();
          let expiresTime = new Date(now.getTime() + this.expiresMs);

          const authData = {
            user: res.data.user,
            expiresMs: this.expiresMs,
          };

          localStorage.setItem("loggedIn", JSON.stringify(res.data));
          localStorage.setItem("expSession", expiresTime);

          this.$store.dispatch("auth/login", authData);
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err.response);
          this.overlayProcess = false;
          this.errMsg = err.response.data.message;
          this.isValid = false;
        });
    },
    disableRegister() {
      alert("This feature is inactive");
    },
  },
  computed: {
    ...mapGetters("auth", {
      successMsg: "registerMsg",
    }),
  },
};
</script>

<style>
</style>