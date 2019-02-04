'use strict'
import SSilva from './SSilva'

const ssilva = {
  install (Vue) {
    Vue.prototype.$SSilva = new SSilva(Vue)
  }
}

export default ssilva
