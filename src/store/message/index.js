import mutations from "./mutations";
import actions from "./actions";

const state = () => ({
  message: "",
  type: ""
});

export default {
  namespaced: true,
  mutations,
  actions,
  state
};
