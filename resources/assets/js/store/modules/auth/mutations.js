const AUTH_USER = (state, payload) => {
  state.user = payload
  state.authenticated = true
}

const CHANGE_URL = (state, url) => {
  state.urlBack = url
}

const AUTH_LOGOUT = (state) => {
  state.user = {}
  state.authenticated = false
}

export default {
  AUTH_USER, CHANGE_URL, AUTH_LOGOUT
}