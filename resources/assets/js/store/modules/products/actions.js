import axios from 'axios'
import { URL_BASE } from "../../../services/http";

const RESOURCE = 'products'
const CONFIGS = {
  headers: {
    'content-type': 'multipart/form-data'
  }
}

const getProducts = ({ commit }, params) => {
  commit('PRELOADER', true)
  return new Promise((resolve, reject) => {
    axios.get(`${URL_BASE}/${RESOURCE}`, {params})
      .then(response => {
        // console.log(response)
        commit('LOAD_PRODUCTS', response.data)
        resolve(response)
      })
      .catch(error => reject(error))
      .finally(() => commit('PRELOADER', false))
  })
}

const getProduct = ({ commit }, id) => {

  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.get(`${URL_BASE}/${RESOURCE}/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
      .finally(() => commit('PRELOADER', false))
  })
}

const storeProduct = ({ commit }, payload) => {
  //console.log(payload)
  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.post(`${URL_BASE}/${RESOURCE}`, payload, CONFIGS)
      .then(response => resolve(response))
      .catch(error => reject(error.response.data.errors))
      .finally(() => commit('PRELOADER', false))
  })
}

const updateProduct = ({ commit }, formData) => {

  commit('PRELOADER', true)

  // Passar o método para PUT
  formData.append('_method', 'PUT')

  return new Promise((resolve, reject) => {
    axios.post(`${URL_BASE}/${RESOURCE}/${formData.get('id')}`, formData)
      .then(() => resolve())
      .catch(error => reject(error.response.data.errors))
      .finally(commit('PRELOADER', false))
  })
}

const destroyProduct = ({ commit }, id) => {

  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.delete(`${URL_BASE}/${RESOURCE}/${id}`)
      .then(() => resolve())
      .catch(error => reject(error))
      .finally(commit('PRELOADER', false))
  })
}

export default {
  getProducts, getProduct, storeProduct, updateProduct, destroyProduct
}