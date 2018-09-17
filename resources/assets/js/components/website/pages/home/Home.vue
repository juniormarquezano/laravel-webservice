<template>
  <div>
    <div class="row mt-lg-4">
      <!--<product-search @search="search"></product-search>-->
      <search @search="search"></search>
    </div>
    <div class="row mt-lg-4">
      <div class="col-4 mb-sm-4" v-for="product in products.data" :key="product.id">
        <!-- Separar em um unico componente -->
        <div class="card" style="width: 18rem;">
          <span v-if="product.image">
            <img class="card-img-top" :src="[`/storage/products/${product.image}`]" :alt="product.name">
          </span>
          <span v-else>
            <img class="card-img-top" src="/storage/no-image.png">
          </span>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <router-link :to="{ name: 'product', params: {id: product.id}}" class="btn btn-primary btn-block mb-sm-2">Mais Detalhes</router-link>
            <add-cart :product="product"></add-cart>
          </div>
        </div>
        <!-- Separar -->
      </div>
    </div>
    <pagination 
      :pagination="products"
      @paginate="pagination"></pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '../../../layouts/pagination'
// import ProductSearch from '../../../admin/pages/products/partials/ProductSearch'
import Search from './partials/Search'
import AddCart from '../cart/partials/AddCart'
export default {
  name: 'HomeCompoment',
  components: { Pagination, Search, AddCart },
  data () {
    return {
      filter: '',
      category_id: ''
    }
  },
  methods: {
    ...mapActions(['getProducts']),
    pagination (page = 1) {
      this.getProducts({ ...this.params, page })
    },
    search (params) {
      this.filter = params.filter
      this.category_id = params.category_id
      this.pagination(1)
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.list
    }),
    params () {
      return {
        filter: this.filter,
        category_id: this.category_id,
        page: this.products.current_page
      }
    }
  },
  created () {
    if (this.products.length == 0) {
      this.pagination(1)
    }
  },
}
</script>