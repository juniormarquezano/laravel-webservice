<template>
  <div>
    <form class="form form-inline" @submit.prevent="search">
      <select class="form-control mr-sm-3" v-model="category_id">
        <option>Selecione uma categoria</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <input type="text" placeholder="Pesquisar:" class="form-control mr-sm-2" v-model="filter">
      <button type="submit" class="btn btn-outline-success">Pesquisar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      filter: '',
      category_id: ''
    }
  },
  methods: {
    ...mapActions(['getCategories']),
    search () {
      this.$emit('search', {
        filter: this.filter,
        category_id: this.category_id
      })
      //this.search = {}
    }
  },
  computed: mapState({
    categories: state => state.categories.list
  })
}
</script>

<style scoped>

</style>

