import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/style/global.css"
import contructApp from "./contruct/app";
import { ElCol, ElRow,ElButton } from 'element-plus';
const start=async ()=>{
    //合约
    await contructApp.init();
    const instance = await contructApp.contracts.Adoption.deployed();
    store.commit("setContractInstance",instance)


    const app=createApp(App).use(store).use(router)
    app.use(ElCol).use(ElButton).use(ElRow)
    app.mount('#app')
}
start()
