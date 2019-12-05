const actions = {
  showMessage({ commit }, { message, type, timeout }) {
    commit("setMessage", { message, type });
    if (timeout) {
      setTimeout(() => {
        commit("clearMessage");
      }, timeout);
    }
  }
};

export default actions;
