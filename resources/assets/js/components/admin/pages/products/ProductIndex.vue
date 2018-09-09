<template>
  <div>
    <button class="btn btn-primary mb-sm-3" @click.prevent="showModal = true">Adicionar</button>
    <product-form 
      :showModal="showModal"
      :product="product"
      :update="update"
      @close="reset" 
      @success="pagination"></product-form>
    <table class="table table-striped">
			<thead class="thead-dark">
				<tr>
					<th width="50" class="text-center">#</th>
					<th width="200px">Produto</th>
					<th>Descrição</th>
					<th width="100px" class="text-center">Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="product in products.data" :key="product.id">
					<!--<td class="text-center">{{ product.id }}</td>-->
          <td>
            <span v-if="product.image">
              <img :src="[`/storage/products/${product.image}`]" :alt="product.name" class="img-list">
            </span>
          </td>
					<td>{{ product.name }}</td>
					<td>{{ product.description }}</td>
					<td class="text-center">
						<div class="btn-group">
							<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Ações
							</button>
							<div class="dropdown-menu">
								<a href="" @click.prevent="edit(product.id)" class="dropdown-item">Editar</a>
								<!--<a href="" @click.prevent="confirmDestroy(product)" class="dropdown-item">Deletar</a>-->
                <!-- usando um componente genérico para deletar -->
                <destroy-component :item="product" @destroy="destroy"></destroy-component>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
    <pagination
			:pagination="products"
			:offset="6"
			@paginate="pagination"
		></pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProductForm from './partials/ProductForm'
import Pagination from '../../../layouts/pagination'
import DestroyComponent from '../../../layouts/destroy'
export default {
  name: 'ProductIndex',
  components: { ProductForm, Pagination, DestroyComponent },
  data: () => ({
    showModal: false,
    update: false,
    product: {
      id: '',
      name: '',
      description: '',
      image: '',
      category_id: ''
    }
  }),
  computed: {
    ...mapState({
      products: state => state.products.list
    }),
    params () {
      return {
        page: this.products.current_page
      }
    }
  },
  methods: {
    ...mapActions(['getProducts', 'getProduct', 'destroyProduct']),
    pagination (page) {
      this.getProducts({...this.params, page})
    },
    edit (id) {
      this.getProduct(id)
        .then(response => {
          this.product = response
          this.showModal = true
          this.update = true
        })
        .catch(error => {})
    },
    /*
    confirmDestroy (product) {
      this.$snotify.error(`Deseja deletar o produto: ${product.name}`, 'Deletar?', {
        timeout: 6000,
        showProgressBar: true,
        closeOnClick: true,
        buttons: [
          {text: 'Não', action: (toast) => { this.$snotify.remove(toast.id) }},
          {text: 'Sim', action: (toast) => {this.destroy(product), this.$snotify.remove(toast.id)}},
        ]
      })
    },
    */
    destroy (product) {
      this.destroyProduct(product.id)
        .then(() => {
          this.$snotify.success(`Produto ${product.name} deletado com sucesso!`)
          this.reset()
          this.pagination(this.params.page)
        })
        .catch(() => {
          this.$snotify.error('Algo deu errado!', 'Ops, Erro!')
        })
    },
    reset () {
      this.update = false
      this.showModal = false
      this.product = {
        id: '',
        name: '',
        description: '',
        image: '',
        category_id: ''
      }
    }
    /* (Para estudo) Existia para fazer a alteração de estado de this.show
    open () { // Open Modal
      this.show = !this.show
    },
    close (test) { // Close Modal
      this.show = test
    }
    */
  },
  mounted() {
    this.pagination()
  },
}
</script>

<style scoped>
.img-list { max-width: 30px;}
</style>

