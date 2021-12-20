<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loggedIn: JSON.parse(localStorage.getItem("loggedIn")),
    };
  },
  created() {
    const expires = this.loggedIn.expires;
    const exp = expires * 1000;
    const expSession = exp * 24;

    if (this.loggedIn) {
      setInterval(() => {
        this.$store.dispatch("auth/logout");
      }, expSession);
    }
  },
};
</script>

<style>
</style>
