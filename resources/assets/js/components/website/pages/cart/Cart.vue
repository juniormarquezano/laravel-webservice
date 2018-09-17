<template>
  <div>
    <div class="card mt-lg-5" v-if="products.length > 0">
      <div class="card-header">
        <strong>Carrinho de Compras</strong>
      </div>
      <ul v-for="product in products" :key="product.id" class="list-group list-group-flush">
        <li class="list-group-item">
          <img v-if="product.image" class="card-img-top cart-img" :src="`/storage/products/${product.image}`">
          <img v-else src="/storage/no-image.png" class="card-img-top cart-img">
          <span class="ml-sm-3">{{ product.name }}</span>
          <button class=" btn btn-danger btn-sm float-right" @click.prevent="remove(product)">Remover</button>
        </li>
      </ul>
    </div>
    <div v-else class="alert alert-primary mt-lg-5" role="alert">
      O carrinho está vazio!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Cart',
  computed: mapState({
    products: state => state.cart.products
  }),
  methods: {
    remove (product) {
      this.$store.commit('REMOVE_CART', product)
    }
  }
}
</script>

<style scoped>
.cart-img {
  max-width: 60px;
}
</style>
