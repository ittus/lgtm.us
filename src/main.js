import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/index.scss";
import { auth } from "./firebase";
import VueGtm from "vue-gtm";

Vue.config.productionTip = false;

if (process.env.VUE_APP_GTM_ID) {
  Vue.use(VueGtm, {
    id: process.env.VUE_APP_GTM_ID,
    enabled: true,
    debug: process.env.NODE_ENV !== "production",
    loadScript: true,
    vueRouter: router,
    trackOnNextTick: true
  });
}

let app;
auth.onAuthStateChanged(user => {
  store.commit("setUser", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
