<template>
	<div class="container">
		<div class="row mt-lg-5 d-flex justify-content-center">
			<div class="col-8">
				<div class="card">
					<div class="card-header">
						CADASTRE-SE
					</div>
					<div class="card-body">
						<form @submit.prevent="register()">
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
							<button type="submit" class="btn btn-primary">Cadastrar</button>
							-->
							<user-form :user="user" :errors="errors"></user-form>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import userForm from './partials/userForm'
import { mapActions } from 'vuex'
export default {
	name: "Register",
	components: { userForm },
	data () {
		return {
			user: {
				name: '',
				email: '',
				password: ''
			},
			errors: {}
		}
	},
	methods: {
		...mapActions(['registerUser']),
		register () {
			this.registerUser(this.user)
				.then(() => {
          this.$router.push({ name: 'dashboard.index' })
					this.$snotify.success('Sucesso ao Cadastrar!')
				})
				.catch(response => {
          this.errors = response.errors
					this.$snotify.error('Falha ao cadastrar', 'Ops: Erro!')
				})
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