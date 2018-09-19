import { TOKEN } from "../../../services/http";

const actions = {
  registerUser ({ commit }, payload) {
    commit('PRELOADER', true)
    return new Promise((resolve, reject) => {
      axios.post(`api/register`, payload)
        .then(response => {
          const token = response.data.token
          localStorage.setItem(TOKEN, token)
          window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          commit('AUTH_USER', response.data.user)
          resolve()
        })
        .catch(error => reject(error.response.data))
        .finally(() => commit('PRELOADER', false))
    })
  },

  updateUser ({ commit }, payload) {
    commit('PRELOADER', true)
    return new Promise((resolve, reject) => {
      axios.put(`api/update`, payload)
        .then(response => {
          commit('AUTH_USER', response.data)
          resolve(response)
        })
        .catch(error => reject(error.response.data))
        .finally(() => commit('PRELOADER', false))
    })
  }
}
export default {
  actions
}