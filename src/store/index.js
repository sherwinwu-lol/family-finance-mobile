import {createStore} from "vuex";

const store = createStore({
  state: function() {
    return {
      token: null
    }
  },
  mutations:{
    login(state, payload) {
      state.token = payload.token;
    }
  }
})

export default store;