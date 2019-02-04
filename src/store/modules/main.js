import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    cache: {},
    results: {},
    selectedCharacter: {},
    selectedFilm: {},
    charactersForFilm: []
  },
  getters: {
    getCache: state => request => {
      return state.cache[request]
    }
  },
  actions: {
    SET_CACHE: ({ commit }, data) => {
      commit('SET_CACHE', data)
    },
    SET_CHARACTER: ({ commit }, data) => {
      commit('SET_CHARACTER', data)
    },
    SET_CHARACTERS_FOR_FILM: ({ commit }, data) => {
      commit('SET_CHARACTERS_FOR_FILM', data)
    },
    SET_FILM: ({ commit }, data) => {
      commit('SET_FILM', data)
    },
    SET_RESULTS: ({ commit }, data) => {
      commit('SET_RESULTS', data)
    }
  },
  mutations: {
    SET_CACHE: (state, data) => {
      Vue.set(state.cache, data.request, data.results)
    },
    SET_CHARACTER: (state, data) => {
      state.selectedCharacter = data
    },
    SET_CHARACTERS_FOR_FILM: (state, data) => {
      state.charactersForFilm = data
    },
    SET_FILM: (state, data) => {
      state.selectedFilm = data
    },
    SET_RESULTS: (state, data) => {
      Vue.set(state.results, data.entity, data.results)
    }
  }
}
