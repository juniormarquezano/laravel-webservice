<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">
          <!--<img src="/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="">-->
          NavBar
        </a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'contact'}" class="nav-link">Contato</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'cart'}" class="nav-link">Carrinho ({{ cart.length }})</router-link>
            </li>
          </ul>
          <ul class="navbar-nav float-right">
            <li class="nav-item text-center">
              <div v-if="logged">
                <a href="" @click.prevent="logout()" class="nav-link float-right">Logout</a>
                <router-link :to="{ name: 'dashboard.index'}" class="nav-link float-right">
                  Olá, {{ user.name }}
                </router-link>
              </div>
              <router-link v-else :to="{ name: 'auth.login'}" class="nav-link float-right">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['auth_logout']),
    logout () {
      this.auth_logout()
    }
  },
  computed: mapState({
    cart: state => state.cart.products,
    user: state => state.auth.user,
    logged: state => state.auth.authenticated 
  })
}
</script>
