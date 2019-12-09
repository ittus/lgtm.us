import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/index.scss";
import { auth } from "./firebase";

Vue.config.productionTip = false;

auth.onAuthStateChanged(user => {
  store.commit("setUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
