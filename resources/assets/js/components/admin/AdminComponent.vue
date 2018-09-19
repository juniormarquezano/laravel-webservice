<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-lg-4">
      <div class="container">
        <a class="navbar-brand" href="#">
          ADMIN
        </a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'dashboard.index' }" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'category.index'}" class="nav-link">Categorias ({{ count }})</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'product.index'}" class="nav-link">Produtos</router-link>
            </li>
          </ul>
          <!--
          <ul class="navbar-nav float-right">
            <li class="nav-item">
              <a href="" class="nav-link">{{ user.name }}</a>
            </li>
            <li class="nv-item">
              <a href="" @click.prevent="logout()" class="nav-link">Logout</a>
            </li>
          </ul>
          -->
          <header-user></header-user>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderUser from '../layouts/HeaderUser'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'AdminComponent',
  components: { HeaderUser },
  methods: {
    /*
    ...mapActions(['auth_logout']),
    logout () {
      this.auth_logout()
      this.$router.push({name: 'auth.login'})
    }
    */
  },
  computed: {
    /*
    ...mapState({
      user: state => state.auth.user
    }),
    /*
    totalCategories() {
      return this.$store.state.categories.list.length
    }
    */
    // ...mapGetters('categories', ['countCategories'])
    /*
    ...mapGetters('categories', {
      count: 'countCategories'
    })
    */
    ...mapGetters({
      count: 'countCategories'
    })
  }
}  
</script>

<style scoped>
.mb-20 {
  margin-bottom: 20px
}
</style>
