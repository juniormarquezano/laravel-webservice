<template>
	<div>
		<form class="form" @submit.prevent="submit()">
			<div :class="['form-group', { 'has-error': errors.name }]">
				<input type="text" class="form-control" placeholder="Nome do Produto" v-model="product.name">
				<span v-if="errors.name">{{ errors.name[0] }}</span>
			</div>
			<div :class="['form-group', { 'has-error': errors.description }]">
				<textarea class="form-control" rows="10" v-model="product.description" placeholder="Descrição do Produto"></textarea>
				<span v-if="errors.description">{{ errors.description[0] }}</span>
			</div>
			<div :class="['form-group', { 'has-error': errors.category_id }]">
				Categorias: 
				<select class="form-control" v-model="product.category_id">
					<option value="">Selecione uma categoria</option>
					<option v-for="category in categories" :key="category.id" :value="category.id">
						{{ category.name }}
					</option>
				</select>
				<span v-if="errors.category_id">{{ errors.category_id[0] }}</span>
			</div>
			<div class="form-group">
				<button class="btn btn-primary">Enviar</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: "ProductForm",
	props: {
		update: {
			require: false,
			type: Boolean,
			default: false
		},
		product: {
			require: false,
			type: Object,
			default: () => {
				return {
					id: '',
					name: '',
					description: '',
					// image: '',
					category_id: ''
				}
			}
		}
	},
	data() {
	  return {
	    errors: {}
		}
	},
	methods: {
		...mapActions(['storeProduct']),
		submit () {
		  // Limpo a propriedade errors
			// this.errors = {}
			// console.log(this.product)
			this.storeProduct(this.product)
				.then(() => {
				  this.$snotify.success('Cadastrado com sucesso!', 'Sucesso')
					this.$emit('success')
					this.reset()
				})
				.catch(errors => this.errors = errors)
		},
		reset () {
		  this.errors = {}
		  /*
		  this.product = {
        id: '',
				name: '',
				description: '',
				// image: '',
				category_id: 27
			}
			*/
		}
	},
	computed: {
		...mapState({
			categories: state => state.categories.list
		})
	}
}
</script>

<style scoped>

</style>