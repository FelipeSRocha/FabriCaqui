import { factory } from "./types/types"
import { isValidCEP, isValidCNPJ ,isValidEmail} from "./verifyString"


export const verifyFactoryForm = (factory:factory) =>{
    if(
        factory.general.factoryName &&
        factory?.general?.phoneContact?.length>=8 &&
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

export const verifyCorrectForm = (factory:factory)=>{
    const errors = []
    if (!factory?.general?.factoryName) {
        errors.push("Nome da fábrica é obrigatório \n");
    }

    if (factory?.general?.phoneContact?.length < 10) {
    errors.push("Telefone de contato inválido \n");
    }

    if (!isValidCNPJ(factory?.general?.CNPJ)) {
    errors.push("CNPJ inválido \n");
    }

    if (!isValidEmail(factory?.general?.emailContact)) {
    errors.push("E-mail de contato inválido \n");
    }

    if (!isValidCEP(factory?.address?.cep)) {
    errors.push("CEP inválido \n");
    }

    if (!factory?.address?.logradouro) {
    errors.push("Logradouro é obrigatório \n");
    }

    if (!factory?.address?.numero) {
    errors.push("Número é obrigatório \n");
    }

    if (!factory?.address?.localidade) {
    errors.push("Cidade é obrigatória \n");
    }

    if (!factory?.address?.uf) {
    errors.push("UF é obrigatória \n");
    }

    if (!factory?.location?.coordinates) {
    errors.push("Coordenadas são obrigatórias \n");
    }
    if (errors.length){
        alert(errors)
        return false
    }
    return true;
}