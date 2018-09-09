<template>
	<div>
		<form class="form form-inline" @submit.prevent="search">
			<input type="text" placeholder="Pesquisar:" class="form-control mr-sm-2" v-model="filter">
			<button type="submit" class="btn btn-outline-success">Pesquisar</button>
		</form>
	</div>
</template>

<script>
  export default {
    name: 'SearchProduct',
    data() {
      return {
        filter: ''
      }
    },
    methods: {
      search () {
        this.$emit('search', this.filter)
        this.filter = ''
      }
    }
  }
</script>

<style scoped>

</style>

