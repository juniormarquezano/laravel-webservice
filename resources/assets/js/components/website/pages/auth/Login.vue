<template>
  <div class="container">
    <div class="row mt-lg-5 d-flex justify-content-center">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            LOGIN DE ACESSO
          </div>
          <div class="card-body">
            <form @submit.prevent="login()">
              <div class="form-group">
                <label for="InputEmail">Email address</label>
                <input type="email" class="form-control" id="InputEmail" aria-describedby="email" placeholder="Enter email" v-model="user.email">
              </div>
              <div class="form-group">
                <label for="InputPassword">Password</label>
                <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="user.password">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['authenticate']),
    login () {
      this.authenticate(this.user)
        .then(() => this.$router.push({ name: 'dashboard.index'}))
        .catch(() => {
          this.$snotify.error('Falha ao acessar...', 'Dados Inválidos')
        })
    }
  }
}
</script>

<style scoped>

</style>



