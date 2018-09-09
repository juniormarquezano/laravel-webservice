<template>
  <div>
    <form class="form" @submit.prevent="submit()">
      <div :class="['form-group', { 'has-error': errors.name }]">
        <input type="text" class="form-control" placeholder="Nome da Categoria" v-model="category.name">
        <span v-if="errors.name">{{ errors.name[0] }}</span>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Enviar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CategoryForm',
  props: {
    category: {
      require: false,
      type: Object|Array,
      default: () => {
        return {
          id: '',
          name: ''
        }
      }
    },
    updating: {
      require: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errors: {}
    }
  },
  methods: {
    // ...mapActions(['storeCategory']),
    submit () { 
      // console.log(this.category)
      //console.log(this.action)
      const action = this.updating ? 'updateCategory' : 'storeCategory'
      // Nesse caso especifico não foi possível utilizar ...mapActions por não
      // conseguir fazer uma comparação ternária action: 
      // this.updating ? 'updateCategory' : 'storeCategory'
      this.$store.dispatch(action, this.category)
        .then(() => {
          this.$snotify.success('Sucesso ao cadastrar')
          this.$router.push({ name: 'category.index' })
        })
        .catch(error => {
          this.$snotify.error('Erro ao Cadastrar', 'Ops!')
          this.errors = error.response.data.errors
          // console.log(error.response.data.errors)
        })

      /*
      this.storeCategory(this.category)
        .then(() => this.$router.push({ name: 'category.index' }))
        .catch()
      */
      /*
      this.$store.dispatch('storeCategory', this.category)
        .then(() => this.$router.push({ name: 'category.index' }))
        .catch()
      */
    }
  }
}
</script>

<style scoped>
.has-error {
  color: red
}
.has-error input {
  border: 1px solid red;
}
</style>
