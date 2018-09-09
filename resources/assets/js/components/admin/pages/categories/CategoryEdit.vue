<template>
  <div>
    <h4>Editar Categoria</h4>
    <!--
    <form class="form">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Nome da Categoria" v-model="category.name">
      </div>
      <div v-for="product in category.products" :key="product.id">
        {{ product.name }}
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Enviar</button>
      </div>
    </form>
    -->
    <category-form :category="category" :updating="true"></category-form>
  </div>
</template>

<script>
import CategoryForm from './partials/CategoryForm'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'CategoryEdit',
  components: {
    CategoryForm
  },
  props: {
    id: {
      require: true
    }
  },
  /*
  data() {
    return {
      category: {
        name: ''
      }
    }
  },
  */
  methods: {
    ...mapActions(['getCategory'])
  },
  computed: {
    ...mapState({
      category: state => state.categories.category
    })
  },
  mounted() {
    this.getCategory(this.id)
      .then()
      .catch(() => {
        this.$snotify.error('Categoria não encontrada!', '404')
        this.$router.push({ name: 'category.index' })
      })
      //.then(response => this.category = response)
      //.catch()
  },
}
</script>

<style scoped>

</style>

