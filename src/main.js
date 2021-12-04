import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import titleMixin from "./mixins/titleMixin";
import { api } from "./plugins/axios";
import { restrictApi } from "./plugins/axios";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib";

Vue.config.productionTip = false;

Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  vuetify,
  api,
  restrictApi,
  render: (h) => h(App),
}).$mount("#app");

Vue.component("v-text-field", VTextField);
Vue.use(VCurrencyField, {
  locale: "pt-BR",
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: true,
});
