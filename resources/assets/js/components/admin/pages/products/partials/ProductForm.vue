<template>
  <div>
    <!--<p>ShowModal => {{ showModal }}</p>-->
    <!--<button class="btn btn-success" @click.prevent="closeModal()">Close Modal (Filho)</button>-->
    <vodal :show="showModal" animation="zoom" @hide="closeModal()" :width="600" :height="500">
      <!--<form-test @success="success"></form-test>-->
      <form class="form" @submit.prevent="submit()">
        <div :class="['form-group', { 'has-error': errors.image }]">
          <div v-if="preview">
            <img :src="preview" class="image-preview">
            <button class="btn btn-danger" @click.prevent="removePreview()">Remover</button>
          </div>
          <div v-else>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                <input @change="onFileChange" type="file" class="custom-file-input">
                <label class="custom-file-label">Selecione a imagem</label>
              </div>
            </div>
            <!--<input type="file" class="form-control" @change="onFileChange" :value="product.image">-->
          </div>
          <span v-if="errors.image">{{ errors.image[0] }}</span>
        </div>
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
    </vodal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Vodal from 'vodal'
export default {
  name: 'ProductForm',
  components: { Vodal },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    update: {
      type: Boolean,
      required: false,
      default: false
    },
    product: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    /*
    product: {
      id: '',
      name: '',
      description: '',
      // image: '',
      category_id: ''
    },
    */
    upload: null,
    preview: null,
    errors: {}
  }),
  computed: mapState({
    categories: state => state.categories.list
  }),
  methods: {
    ...mapActions(['storeProduct', 'updateProduct']),
    submit () {

      let action = this.update ? 'updateProduct' : 'storeProduct'

      // Para o upload da imagem
      const formData = new FormData()
      if (this.upload != null) {
        formData.append('image', this.upload)
      }
      formData.append('id', this.product.id)
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('category_id', this.product.category_id)

      // console.log(formData)
      this.$store.dispatch(action, formData)
        .then(() => {
          this.$snotify.success('Salvo com sucesso!')
          this.closeModal()
          this.$emit('success')
        })
        .catch(errors => {
          this.$snotify.error('Algo deu errado!', 'Ops, Erro!')
          this.errors = errors
        })
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.upload = files[0]
      this.previewImage(files[0])
      // console.log(this.upload)
    },
    previewImage (image) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.preview = e.target.result
      }
      reader.readAsDataURL(image)
    },
    removePreview () {
      this.preview = null
      this.upload = null
    },
    closeModal () {
      this.reset()
      //const modal = !this.showModal (para estudo)
      //this.$emit('close', modal) (para estudo)
      this.$emit('close')
    },
    reset () {
      this.errors = {}
      this.preview = null
      this.upload = null
      // this.product = {}
    }
  }
}
</script>

<style scoped>
.image-preview { max-width: 60px; }
</style>

