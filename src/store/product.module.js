import {api} from '../plugins/axios'

export const product = {
  namespaced: true,
  state: {
    category: "",
    allProductGuest: "",
  },
  getters: {
    getCategory(state) {
      return state.category
    },
    getProductGuest(state) {
      return state.allProductGuest
    }
  },
  actions: {
    category({commit}) {
      api.get('/category')
      .then((res) => {
        commit('category', res.data)
      })
      .catch((err) => {
        console.log(err.response.data)  
      })
    },
    allProductGuest({commit}) {
      api.get('/all-product')
      .then((res) => {
        console.log(res)
        commit('allProductGuest', res.data)
      }).catch((err) => {
        console.log(err.response.data)
      })
    } 
  },
  mutations:{
    category(state, data) {
      state.category = data
    },
    allProductGuest(state, data) {
      state.allProductGuest = data
    } 
  }
}