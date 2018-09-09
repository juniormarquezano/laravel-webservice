import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminComponent from '../components/admin/AdminComponent'
import Dashboard from '../components/admin/pages/dashboard/Dashboard'
import CategoryIndex from '../components/admin/pages/categories/CategoryIndex'
import CategoryCreate from '../components/admin/pages/categories/CategoryCreate'
import CategoryEdit from '../components/admin/pages/categories/CategoryEdit'
import ProductIndex from '../components/admin/pages/products/ProductIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    component: AdminComponent,
    children: [
      { path: '', component: Dashboard, name: 'dashboard.index' },
      { path: 'categories/', component: CategoryIndex, name: 'category.index' },
      { path: 'categories/create', component: CategoryCreate, name: 'category.create' },
      { path: 'categories/:id/edit', component: CategoryEdit, name: 'category.edit', props: true },
      { path: 'products', component: ProductIndex, name: 'product.index' },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router