<script>
import { mapActions, mapState } from 'vuex'
import ProductForm from './partials/ProductForm'
import Pagination from '../../../layouts/pagination'
import Vodal from 'vodal'

export default {
	name: "ProductIndex",
	components: {
		ProductForm,
		Pagination,
		Vodal
	},
	data () {
		return {
			showModal: false
		}
	},
	methods: {
		...mapActions(['getProducts']),
		pagination (page) {
			this.getProducts({...this.params, page})
		}
	},
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
	mounted () {
		this.pagination(1)
	},
}
</script>

<template>
	<div>
		<h4>Listagem de Produtos</h4>
		<div class="row mb-sm-2">
			<div class="col">
				<button class="btn btn-success" @click.prevent="showModal = !showModal">Adicionar</button>
				<!-- Vodal e Form -->
				<vodal
					:show="showModal"
					animation="zoom"
					@hide="showModal = !showModal"
					:width="600"
					:height="500">
					<product-form></product-form>
				</vodal>
			</div>
			<div class="col"></div>
		</div>
		<table class="table table-striped">
			<thead class="thead-dark">
				<tr>
					<th>#</th>
					<th>Nome do Produto</th>
					<th>Descrição</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="product in products.data" :key="product.id">
					<td>{{ product.id }}</td>
					<td>{{ product.name }}</td>
					<td>{{ product.description }}</td>
					<td>...</td>
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

<style scoped>

</style>