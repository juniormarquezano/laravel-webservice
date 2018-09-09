<template>
	<div>
		<h4>Listagem de Produtos</h4>
		<div class="row mb-sm-2">
			<div class="col">
				<button class="btn btn-success" @click.prevent="showModal = !showModal">Adicionar</button>
				<!-- Pai -->
				<vodal
					:show="showModal"
					animation="zoom"
					@hide="showModal = !showModal"
					:width="600"
					:height="500">
					<product-form @success="success"></product-form> <!-- Filho -->
				</vodal>
			</div>
			<div class="col">
				<search @search="filter"></search>
			</div>
		</div>
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
					<td class="text-center">{{ product.id }}</td>
					<td>{{ product.name }}</td>
					<td>{{ product.description }}</td>
					<td class="text-center">
						<div class="btn-group">
							<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Ações
							</button>
							<div class="dropdown-menu">
								<a href="" @click.prevent="edit(product.id)" class="dropdown-item">Editar</a>
								<a href="" class="dropdown-item">Deletar</a>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<!--
		<ul v-if="products.last_page > 1">
			<li v-if="products.current_page > 1">
				<a href="" @click.prevent="pagination(products.current_page - 1)">Anterior</a>
			</li>
			<li v-if="products.current_page < products.last_page">
				<a href="" @click.prevent="pagination(products.current_page + 1)">Próxima</a>
			</li>
		</ul>
		-->
		<pagination
			:pagination="products"
			:offset="6"
			@paginate="pagination"
		></pagination>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import pagination from '../../../layouts/pagination'
import search from './partials/ProductSearch'
import Vodal from 'vodal'
import ProductForm from './partials/ProductForm'

export default {
	name: "ProductIndex",
	components: {
	  pagination,
		search,
		Vodal,
		ProductForm
	},
	data() {
	  return {
	    search: '',
			showModal: false
		}
	},
	methods: {
    ...mapActions(['getProducts', 'getProduct']),
    pagination (page) {
      // console.log('pagination')
      // this.$store.dispatch('getProducts', {...this.params, page})
			this.getProducts({...this.params, page})
    },
		filter (filter) {
			this.search = filter
			this.pagination(1)
		},
		success () {
      this.showModal = false
			this.pagination(1)
		},
		edit (id) {
			this.getProduct(id)
		}
  },
	computed: {
		...mapState({
			products: state => state.products.list
		}),
		params () {
		  return {
		    page: this.products.current_page,
				filter: this.search
			}
		}
	},
	mounted () {
	  this.pagination(1)
	}
}
</script>

<style scoped>

</style>