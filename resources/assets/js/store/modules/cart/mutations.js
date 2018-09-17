const ADD_CART = (state, payload) => {
  state.products.push(payload)
}

const REMOVE_CART = (state, payload) => {

  let index = state.products.findIndex((product) => {
    return product.id === payload.id
  })
  
  state.products.splice(index, 1)
}

export default {
  ADD_CART, REMOVE_CART
}