<template>
  <div>
    <a href="" @click.prevent="confirmDestroy(item)" :class="className">Excluir</a>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    },
    className: {
      required: false,
      default: 'dropdown-item'
    }
  },
  methods: {
    confirmDestroy (item) {
      this.$snotify.error(`Deseja realmente excluir?`, 'Deletar?', {
        timeout: 6000,
        showProgressBar: true,
        closeOnClick: true,
        buttons: [
          {text: 'Não', action: (toast) => { this.$snotify.remove(toast.id) }},
          {text: 'Sim', action: (toast) => {this.$emit('destroy', item), this.$snotify.remove(toast.id)}},
        ]
      })
    },
  }
}
</script>
