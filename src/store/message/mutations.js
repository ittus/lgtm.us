const mutations = {
  setMessage(state, { message, type }) {
    state.message = message;
    state.type = type;
  },
  clearMessage(state) {
    state.message = "";
    state.type = "";
  }
};

export default mutations;
