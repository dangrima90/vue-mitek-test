import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

const initState = function () {
  return {
    bankId: '01',
    language: 'en'
  }
}

const store = new Store({
  state: initState(),
  mutations: {
    resetStore (state) {
      const s = initState()
      Object.keys(s).forEach((key) => {
        Vue.set(state, key, s[key])
      })
    },
    setBankId (state, bankId) {
      state.bankId = bankId
    },
    setLanguage (state, language) {
      state.language = language
    }
  },

  actions: {
    setBankId({ commit }, bankId) {
      commit('setBankId', bankId)
    },
    setLanguage({ commit }, language) {
      commit('setLanguage', language)
    },
  },

  getters: {
    bankId(state) {
      return state.bankId
    },
    language(state) {
      return state.language
    }
  },

  modules: {}
})

export default store
