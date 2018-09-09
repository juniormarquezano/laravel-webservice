<template>
  <div>
    <h4>Listagem de Categorias</h4>
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'category.create' }" class="btn btn-success mb-10">Cadastrar</router-link>
      </div>
      <div class="col">
        <category-search @searchCategory="search"></category-search>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ index + 1 }}</td>
          <td>{{ category.name }}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Ações
              </button>
              <div class="dropdown-menu">
                <router-link :to="{ name: 'category.edit', params: { id: category.id } }" class="dropdown-item">Editar</router-link>
                <a href="" class="dropdown-item" @click.prevent="confirmDestroy(category)">Deletar</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CategorySearch from './partials/CategorySearch'
export default {
  name: 'CategoryIndex',
  components: {
    CategorySearch
  },
  methods: {
    // ...mapActions('categories', ['getCategories'])
    ...mapActions(['getCategories', 'destroyCategory']),
    destroy (category) {
      this.destroyCategory(category.id)
        .then(() => {
          this.$snotify.success(`Categoria ${category.name} deletada com sucesso!`)
          this.getCategories()
        })
        .catch(() => {
          this.$snotify.error('Erro ao deletar a categoria!', 'Falha')
        })
    },
    confirmDestroy (category) {
      this.$snotify.error(`Deseja deletar a categoria: ${category.name}`, 'Deletar?', {
        timeout: 6000,
        showProgressBar: true,
        closeOnClick: true,
        buttons: [
          {text: 'Não', action: (toast) => { this.$snotify.remove(toast.id) }},
          {text: 'Sim', action: (toast) => {this.destroy(category), this.$snotify.remove(toast.id)}},
        ]
      })
    },
    search (filter) {
      this.getCategories({ name: filter })
    }
  },
  computed: {
    /*
    categories() {
      return this.$store.state.categories.list
    },
    */
    /*
    ...mapState('categories', {
      categories: state => state.list
    })
    */
    ...mapState({
      categories: state => state.categories.list
    }),
    // ...mapState('categories', ['list'])
    // ...mapGetters('categories', ['countCategories'])
    // ...mapGetters(['countCategories'])
  },
  mounted () {
    // this.$store.dispatch('categories/getCategories') // Chamando uma action com $store
    this.getCategories()
  },
}  
</script>

<style scoped>

</style>
