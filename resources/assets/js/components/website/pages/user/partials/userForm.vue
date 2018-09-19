<template>
	<div>
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
		<div class="form-group">
			<button type="submit" class="btn btn-primary">Salvar</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "userForm",
	props: ['user', 'errors']
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