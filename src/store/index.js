import { createStore } from 'vuex'

export default createStore({
  state: {
    contractInstance: null,
    account:""
  },
  mutations: {
    //合约实例
    setContractInstance(state,payload) {
      state.contractInstance = payload
    },
    //事务账号地址
    setAccount(state,payload){
      state.account=payload
    }
  },
  actions: {
  },
  modules: {
  }
})
