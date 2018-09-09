<template>
  <div>
    <h4>Adicionar Nova Categoria</h4>
    <!--
    <form class="form" @submit.prevent="submit()">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Nome da Categoria" v-model="category.name">
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Enviar</button>
      </div>
    </form>
    -->
    <category-form></category-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CategoryForm from './partials/CategoryForm'
export default {
  name: 'CategoryCreate',
  components: {
    CategoryForm
  },
  /*
  data() {
    return {
      category: {
        name: ''
      }
    }
  },
  methods: {
    ...mapActions(['storeCategory']),
    submit () {
      this.storeCategory(this.category)
        .then(() => this.$router.push({ name: 'category.index' }))
        .catch()
      // Método com $store
      this.$store.dispatch('storeCategory', this.category)
        .then(() => this.$router.push({ name: 'category.index' }))
        .catch()
    }
  }
  */
}
</script>

<style scoped>

</style>

