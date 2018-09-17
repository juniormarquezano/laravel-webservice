require('./bootstrap');
window.Vue = require('vue');
import Snotify, { SnotifyPosition } from 'vue-snotify'
import { mapActions, mapState } from 'vuex'

import router from './routes'
import store from './store'

const options = {
  toast: {
    showProgressBar: false,
    position: SnotifyPosition.rightTop
  }
}
Vue.use(Snotify, options)

/**
 * Components Globais
 */
Vue.component('admin-component', require('./components/admin/AdminComponent'))
Vue.component('preloader', require('./components/layouts/preloader'))

const app = new Vue({
  el: '#app',
  router,
  store,
  methods: {
    ...mapActions(['getCategories', 'checkLogin'])
  },
  mounted() {
    this.getCategories()
    this.checkLogin()
      .then(() => router.push({ name: store.state.auth.urlBack }))
  },
});

//store.dispatch('getCategories')