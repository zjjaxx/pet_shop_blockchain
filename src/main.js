import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/style/global.css"
import ContructManager from "./contruct/app";
import { ElCol, ElRow, ElButton } from 'element-plus';
// import VConsole from 'vconsole';
// const vConsole = new VConsole();
const start = async () => {
    //合约
    const contructManager = new ContructManager()
    try {
        const instance = await contructManager.init();
        const accounts=await contructManager.web3Instance.eth.getAccounts()
        store.commit("setContractInstance", instance)
        store.commit("setAccount",accounts[0])
    } catch (error) {
        console.log("error", error)
    }
    const app = createApp(App).use(store).use(router)
    app.use(ElCol).use(ElButton).use(ElRow)
    app.mount('#app')
}
start()
