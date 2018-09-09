const LOAD_CATEGORIES = (state, payload) => {
  state.list = payload
}

const LOAD_CATEGORY = (state, payload) => {
  state.category = payload
  // console.log(payload)
}

export default {
  LOAD_CATEGORIES, LOAD_CATEGORY
}