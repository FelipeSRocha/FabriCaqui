import CadastroFormPF from "../components/forms/CadastroFormPF"
import HeaderBar from "../components/header"
import MainBody from "../components/body/MainBody"

const cadastro = () =>{

    return(
        <MainBody>
            <HeaderBar current="Cadastre-se"></HeaderBar>
            <CadastroFormPF></CadastroFormPF>
        </MainBody>
    )
}

export default cadastro