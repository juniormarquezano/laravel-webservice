import { TOKEN } from '../../../services/http'

const authenticate = ({ commit }, payload) => {

  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    axios.post(`api/auth`, payload)
      .then(response => {
        commit('AUTH_USER', response.data.user)
        const token = response.data.token
        localStorage.setItem(TOKEN, token)
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        resolve()
      })
      .catch(error => reject(error.response.data))
      .finally(() => commit('PRELOADER', false))
  })
}

const checkLogin = ({ commit }) => {

  commit('PRELOADER', true)

  return new Promise((resolve, reject) => {
    const token = localStorage.getItem(TOKEN)
    if (!token) {
      return reject()
    }
    axios.get(`api/user`)
      .then(response => {
        // console.log(response)
        commit('AUTH_USER', response.data.user)
        resolve()
      })
      .catch(error => reject(error))
      .finally(() => commit('PRELOADER', false))
  })
  
}

const auth_logout = ({ commit }) => {
  localStorage.removeItem(TOKEN)
  commit('AUTH_LOGOUT')
}

export default {
  authenticate, checkLogin, auth_logout
}