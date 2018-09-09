<template>
  <div>
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
    <pagination
			:pagination="products"
			:offset="6"
			@paginate="pagination"
		></pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '../../../layouts/pagination'
export default {
  name: 'ProductsList',
  components: { Pagination },
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
  mounted() {
    this.pagination()
  },
}
</script>
