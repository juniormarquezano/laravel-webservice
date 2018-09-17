import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'

import categories from './modules/categories'
import products from './modules/products'
import cart from './modules/cart'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    categories,
    products,
    cart,
    auth
  }
})

export default store