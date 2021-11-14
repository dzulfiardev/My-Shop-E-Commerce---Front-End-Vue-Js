const loggedIn =  JSON.parse(localStorage.getItem('loggedIn'))

const initState = loggedIn ? {
  status: {
    loggedIn: true
  },
  user: loggedIn.user,
  registerMsg: '',
} :
{
  status: {
    loggedIn: false,
  },
  user: null,
  registerMsg: '',
}

export const auth = {
  namespaced: true,
  state: initState,
  getters: {
    registerMsg(state) {
      return state.registerMsg
    },
    getUser(state) {
      return state.user
    },
    loginState(state) {
      return state.status.loggedIn
    }
  },
  actions: {
    successMsg({commit}, msg) {
      commit('registerSuccess', msg)
    },
    login({commit}, data) {
      commit('currentUser', data)
    },
    logout({commit}) {
      localStorage.removeItem("loggedIn")
      commit('deleteCurrentUser')
    }
  },
  mutations: {
    registerSuccess(state, data) {
      state.status.loggedIn = false
      state.registerMsg = data
      setInterval(() => {
        state.registerMsg = ''
      }, 4000)
    },
    registerFailure(state, data) {
      state.status.loggedIn = false
      state.registerMsg = data
    },
    currentUser(state, data) {
      state.status.loggedIn = true,
      state.user = data
    },
    deleteCurrentUser(state) {
      state.status.loggedIn = false,
      state.user = null
    }
  }
}