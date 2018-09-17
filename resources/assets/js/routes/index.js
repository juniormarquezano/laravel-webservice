import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import AdminComponent from '../components/admin/AdminComponent'
import Dashboard from '../components/admin/pages/dashboard/Dashboard'
import CategoryIndex from '../components/admin/pages/categories/CategoryIndex'
import CategoryCreate from '../components/admin/pages/categories/CategoryCreate'
import CategoryEdit from '../components/admin/pages/categories/CategoryEdit'
import ProductIndex from '../components/admin/pages/products/ProductIndex'
import WebsiteComponent from '../components/website/pages/WebsiteComponent'
import HomeComponent from '../components/website/pages/home/Home'
import ContactComponent from '../components/website/pages/contact/Contact'
import Product from '../components/website/pages/products/Product'
import CartComponent from '../components/website/pages/cart/Cart'
import LoginComponent from '../components/website/pages/auth/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    component: WebsiteComponent,
    children: [
      { path: '', component: HomeComponent, name: 'home' },
      { path: 'contato', component: ContactComponent, name: 'contact' },
      { path: 'products/:id', component: Product, name: 'product', props: true },
      { path: 'cart', component: CartComponent, name: 'cart' },
      { path: 'login', component: LoginComponent, name: 'auth.login', meta: { auth: false } }
    ]
  },
  {
    path: '/admin',
    component: AdminComponent,
    meta: { auth: true },
    children: [
      { path: '', component: Dashboard, name: 'dashboard.index' },
      { path: 'categories/', component: CategoryIndex, name: 'category.index' },
      { path: 'categories/create', component: CategoryCreate, name: 'category.create' },
      { path: 'categories/:id/edit', component: CategoryEdit, name: 'category.edit', props: true },
      { path: 'products', component: ProductIndex, name: 'product.index', meta: { auth: true } },
    ]
  }
]

const router = new VueRouter({
  routes
})

// Verificação
router.beforeEach((to, from, next) => {

  const auth_router = to.matched.some(record => record.meta.auth),
        user_logged = store.state.auth.authenticated

  if (to.meta.auth && !user_logged) {
    // console.log(to)
    store.commit('CHANGE_URL', to.name)
    return router.push({ name: 'auth.login' })
  }
  
  // verifica se o meta auth é true e se o usuário não está autenticado
  if (auth_router && !user_logged) {
    store.commit('CHANGE_URL', to.name)
    return router.push({ name: 'auth.login' } )
  }

  if (to.meta.hasOwnProperty('auth') && !to.meta.auth && user_logged) {
    next({
      path: '/admin',
      //query: { redirect: to.fullPath }
    })
  }

  next()
})

export default router