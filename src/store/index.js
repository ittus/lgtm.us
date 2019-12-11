import Vue from "vue";
import Vuex from "vuex";
import message from "./message";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      if (!user) {
        state.user = null;
      } else {
        state.user = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        };
      }
    },
    signOut(state) {
      state.user = null;
    }
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    }
  },
  modules: {
    message
  }
});
