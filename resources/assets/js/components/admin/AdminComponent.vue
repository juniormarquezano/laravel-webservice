<template>
  <div>
    <div class="bg-dark mb-20">
      <ul class="nav container">
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
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminComponent',
  computed: {
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
