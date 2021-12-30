<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loggedIn: null,
      expSession: null,
    };
  },
  created() {
    if (localStorage.getItem("loggedIn")) {
      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
      this.expSession = localStorage.getItem("expSession");
    }
    if (this.loggedIn && this.expSession) {
      let expiresMs = new Date(this.expSession);
      let now = new Date();
      now = now.getTime();

      const expires = expiresMs.getTime();

      if (now > expiresMs) {
        this.$store.dispatch("auth/logout");
      } else {
        const authData = {
          user: this.loggedIn.user,
          expiresMs: expires - now,
        };
        this.$store.dispatch("auth/login", authData);
      }
    }
  },
};
</script>

<style>
</style>
