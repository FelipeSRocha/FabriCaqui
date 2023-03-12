import { factory } from "./types/types"
import { isValidCEP, isValidCNPJ ,isValidEmail} from "./verifyString"


const verifyFactoryForm = (factory:factory) =>{
    if(
        factory.general.factoryName &&
        isValidCNPJ(factory.general.CNPJ) &&
        isValidEmail(factory.general.emailContact) &&

        isValidCEP(factory.address.cep) &&
        factory.address.logradouro &&
        factory.address.numero &&
        factory.address.localidade &&
        factory.address.uf  &&
        factory.location.coordinates 
    ){
        return true
    }
    return false
}

export default verifyFactoryForm