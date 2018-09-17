<template>
  <div>
    <button v-if="notCart" class="btn btn-primary btn-block" @click.prevent="add()">Adicionar ao Carrinho</button>
    <button v-else class="btn btn-danger btn-block" @click.prevent="remove()">Remover do Carrinho</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: ''
    }
  },
  methods: {
    add () {
      // Ver como utilizar o mapMutations
      this.$store.commit('ADD_CART', this.product)
    },
    remove () {
      this.$store.commit('REMOVE_CART', this.product)
    }
  },
  computed: {
    ...mapState({
      products: state => state.cart.products
    }),
    notCart () {
      return this.products.indexOf(this.product) < 0
    }
  }
}
</script>
