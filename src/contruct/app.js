import Web3 from 'web3';
import { getContract } from "../api/api"
const App = {
    web3Instance:null,
    web3Provider: null,
    contracts: {},

    async init() {
        return await this.initWeb3();
    },

    async initWeb3() {
        if (window.ethereum) {
            console.log("window.ethereum exsit")
            this.web3Provider = window.ethereum;
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
            this.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            console.log("ha ha --!")
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        this.web3Instance = new Web3(this.web3Provider);

        return await this.initContract();
    },

    async initContract() {
      const data =(await getContract()).data
      var AdoptionArtifact = data;
      this.contracts.Adoption = TruffleContract(AdoptionArtifact);
      // Set the provider for our contract
      this.contracts.Adoption.setProvider(this.web3Provider);
    },
};

export default App
