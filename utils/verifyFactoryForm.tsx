import { factory } from "./types/types"


const verifyFactoryForm = (factory:factory) =>{
    if(
        factory.address.logradouro === "" ||
        factory.address.numero === undefined ||
        factory.address.localidade === "" ||
        factory.address.uf === ""
    ){
        return false
    }
    return true
}

export default verifyFactoryForm