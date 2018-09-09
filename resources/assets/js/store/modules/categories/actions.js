const getCategories = ({ commit }, params) => {

  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.get('/api/v1/categories', { params })
      .then(response => {
        // console.log(response)
        commit('LOAD_CATEGORIES', response.data)
        resolve()
      })
      .catch(error => {
        console.log(error)
        reject()
      })
      .finally(() => commit('PRELOADER', false))
  })
}

const getCategory = ({ commit }, id) => {
  commit('PRELOADER', true)
  return new Promise((resolve, reject) => {
    axios.get(`api/v1/categories/${id}`)
      .then(response => {
        // console.log(response)
        commit('LOAD_CATEGORY', response.data)
        resolve(response.data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
      .finally(() => commit('PRELOADER', false))
  })
}

const storeCategory = ({ commit }, payload) => {
  
  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.post('/api/v1/categories', payload)
      .then(response => resolve(response))
      .catch(error => reject(error))
      .finally(() => commit('PRELOADER', false))
  })
  
}

const updateCategory = ({ commit }, payload) => {

  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.put(`/api/v1/categories/${payload.id}`, payload)
      .then(response => resolve(response))
      .catch(error => reject(error))
      .finally(() => commit('PRELOADER', false))
  })
  
}

const destroyCategory = ({ commit }, id) => {

  // console.log('destroy', id)
  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.delete(`api/v1/categories/${id}`)
      .then(response => resolve(response))
      .catch(error => reject(error))
      //.finally(() => commit('PRELOADER', false))
  })

}

export default {
  getCategories, getCategory, storeCategory, updateCategory, destroyCategory
}