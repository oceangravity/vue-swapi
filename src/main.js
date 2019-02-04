import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import vClickOutside from 'v-click-outside'
import SSilva from './SSilva/plugin'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTrashAlt, faAngleDown, faAngleUp, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuebar from 'vuebar'

library.add(faSearch, faTrashAlt, faAngleDown, faAngleUp, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(vClickOutside)
Vue.use(SSilva)
Vue.use(Vuebar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
