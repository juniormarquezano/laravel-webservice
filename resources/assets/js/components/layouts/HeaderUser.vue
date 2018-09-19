<template>
	<div>
		<ul v-if="logged" class="navbar-nav float-right">
			<li class="nav-item dropdown show">
				<a class="dropdown-toggle nav-link" id="dropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Olá, {{ user.name }}
				</a>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
					<router-link :to="{ name: 'user.profile' }" class="dropdown-item">Meu Perfil</router-link>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#" @click.prevent="logout()">Logout</a>
				</div>
			</li>
		</ul>
		<ul v-else class="navbar-nav float-right">
			<li class="nav-item">
				<router-link :to="{ name: 'auth.login' }" class="nav-link">Login</router-link>
			</li>
		</ul>
		<!--
		<ul class="navbar-nav float-right">
			<li v-if="logged" class="nav-item dropdown show text-center">
				<router-link :to="{ name: 'dashboard.index'}" class="nav-link float-right">
					Olá, {{ user.name }}
				</router-link>
				<div class="dropdown-menu">
					<a href="" class="dropdown-item">Meu Perfil</a>
					<a href="" @click.prevent="logout()" class="dropdown-item">Logout</a>
				</div>
			</li>
			<li v-else class="nav-item text-center">
				<a href="" class="nav-link float-right">Login</a>
			</li>
		</ul>
		-->
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
	name: "HeaderUser",
	methods: {
		...mapActions(['auth_logout']),
		logout () {
		  this.auth_logout()
      this.$router.push({name: 'auth.login'})
		}
	},
	computed: mapState({
		user: state => state.auth.user,
		logged: state => state.auth.authenticated
	})

}
</script>

<style scoped>

</style>