import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/people'
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('./views/People.vue')
    },
    {
      path: '/films',
      name: 'films',
      component: () => import('./views/Films.vue')
    }
  ]
})
