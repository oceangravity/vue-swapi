'use strict'

import store from '../store/store'
import axios from 'axios'

export default class SSilva {
  constructor (Vue) {
    this.Vue = Vue
    this.data = {}
  }

  onlyText (event) {
    if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)) {
      return true
    } else {
      event.preventDefault()
      return false
    }
  }

  onlyNumber (event) {
    if ((event.charCode > 31 && (event.charCode < 48 || event.charCode > 57)) && event.charCode !== 46) {
      event.preventDefault()
      return false
    }
    return true
  }

  renderSpecies (d) {
    let s = store.state.main.results['species'].filter(s => s.url === d[0])
    return s.length ? s[0].name : 'N/A'
  }

  renderPlanet (d) {
    let s = store.state.main.results['planets'].filter(s => s.url === d)
    return s.length ? s[0].name : 'N/A'
  }

  renderFilm (d) {
    let s = store.state.main.results['films'].filter(s => s.url === d)
    return s.length ? s[0].title : 'N/A'
  }

  async renderCharacters (characters) {
    let data = []
    await characters.forEach(async (character) => {
      let item = await store.getters['main/getCache'](character)
      if (item) {
        data.push({ name: item.name, url: item.url })
      }
    })
    return data
  }

  async requestCharacters (characters) {
    let requests = []
    characters.forEach(async (character) => {
      let item = store.getters['main/getCache'](character)
      if (!item) {
        requests.push(axios.get(character))
      }
    })
    return axios.all(requests)
  }

  recursiveFetch (entity, query = '', next) {
    const me = this
    store.dispatch('ssilva-loading-spinner/show', true)
    let request = `https://swapi.co/api/${entity}/?search=${query}`
    let results = store.getters['main/getCache'](request)
    if (results) {
      store.dispatch('main/SET_RESULTS', { entity: entity, results: results })
      store.dispatch('ssilva-loading-spinner/show', false)
    } else {
      axios.get(next || request).then(res => {
        if (res.data.next === null) {
          me.data[request] = me.data[request] === undefined ? [] : me.data[request]
          me.data[request] = [...me.data[request], ...res.data.results]
          me.data[request].forEach((item) => {
            store.dispatch('main/SET_CACHE', { request: item.url, results: item })
          })
          store.dispatch('main/SET_CACHE', { request: request, results: me.data[request] })
          store.dispatch('main/SET_RESULTS', { entity: entity, results: me.data[request] })
          me.data[request] = undefined
          store.dispatch('ssilva-loading-spinner/show', false)
        } else {
          me.data[request] = me.data[request] === undefined ? [] : me.data[request]
          me.data[request] = [...me.data[request], ...res.data.results]
          me.recursiveFetch(entity, query, res.data.next)
        }
      }, err => {
        throw err
      })
    }
  }
}
