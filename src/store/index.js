import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    user_name: "",
    image_url: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setName (state, name) {
      state.user_name = name
    },
    setImageUrl (state, url) {
      state.image_url = url
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
