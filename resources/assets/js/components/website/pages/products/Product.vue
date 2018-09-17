<template>
  <div>
    <div class="card mt-lg-3">
      <h5 class="card-header">Detalhe do Produto</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <img v-if="product.image" class="card-img-top" :src="`/storage/products/${product.image}`">
            <img v-else src="/storage/no-image.png" class="card-img-top">
          </div>
          <div class="col-8">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <router-link :to="{ name: 'home' }" class="btn btn-primary">Voltar</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// O mais correto seria carregar uma mutation para passar para um state
// mais no curso não foi feito dessa forma, na action está simplesmente passando
// o response pra frente
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ProductDetail',
  props: ['id'],
  data: () => ({
    product: {}
  }),
  methods: {
    ...mapActions(['getProduct'])
  },
  created () {
    this.getProduct(this.id)
      .then(response => this.product = response)
      .catch(error => console.log(error))
  },
}
</script>
