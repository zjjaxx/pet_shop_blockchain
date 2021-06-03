import axios from "./http"
export const getPets=()=>axios.get("/data/pets.json")
export const getContract=()=>axios.get("/contract/Adoption.json")