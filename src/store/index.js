import { createStore } from 'vuex'

export default createStore({
  state: {
    contractInstance: null,
  },
  mutations: {
    setContractInstance(state,payload) {
      state.contractInstance = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
