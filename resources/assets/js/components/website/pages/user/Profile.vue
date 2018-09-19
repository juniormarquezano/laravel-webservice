<template>
	<div class="container">
		<div class="row mt-lg-5 d-flex justify-content-center">
			<div class="col-8">
				<div class="card">
					<div class="card-header">
						ATUALIZAR PERFIL
					</div>
					<div class="card-body">
						<form @submit.prevent="updated()">
							<user-form :user="user" :errors="errors"></user-form>
							<!--
							<div :class="['form-group', { 'has-error': errors.name }]">
								<label for="InputName">Nome:</label>
								<input type="text" class="form-control" id="InputName" placeholder="Nome" v-model="user.name">
								<span v-if="errors.name">{{ errors.name[0] }}</span>
							</div>
							<div :class="['form-group', { 'has-error': errors.email }]">
								<label for="InputEmail">Email address</label>
								<input type="email" class="form-control" id="InputEmail" placeholder="E-mail" v-model="user.email">
								<span v-if="errors.email">{{ errors.email[0] }}</span>
							</div>
							<div :class="['form-group', { 'has-error': errors.password }]">
								<label for="InputPassword">Senha</label>
								<input type="password" class="form-control" id="InputPassword" placeholder="Senha" v-model="user.password">
								<span v-if="errors.password">{{ errors.password[0] }}</span>
							</div>
							<button type="submit" class="btn btn-primary">Atualizar</button>
							-->
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import userForm from './partials/userForm'
import { mapActions, mapState } from 'vuex'
export default {
	name: "Profile",
	components: { userForm },
	data () {
		return {
			errors: {}
		}
	},
	computed: {
		...mapState({
			user: state => state.auth.user
		})
	},
	methods: {
		...mapActions(['registerUser', 'updateUser']),
		updated () {
			this.updateUser(this.user)
				.then(() => {
				  this.reset()
					this.$snotify.success('Sucesso ao Atualizar!')
				})
				.catch(response => this.errors = response.errors)
		},
		reset () {
      this.user.password = ''
      this.errors = {}
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