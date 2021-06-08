import Web3 from 'web3';
import { getContract } from "../api/api"
import globalConfig from "../config"
class ContructManager {
    web3Instance = null
    contracts = {}
    async init() {
        return await this.initWeb3();
    }
    async initWeb3() {
        let web3Provider
        if (window.ethereum) {
            console.log("window.ethereum exsit")
            web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            console.log("window.web3 exsit")
            web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            console.log("ha ha --!")
            web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        this.web3Instance = new Web3(web3Provider);
        return await this.initContract();
    }

    async initContract() {
        const data = (await getContract()).data
        var contractInstance = new this.web3Instance.eth.Contract(data.abi,globalConfig.contractAddress);
        return contractInstance
    }
}


export default ContructManager
