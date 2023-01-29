import CadastroFormEmpresa from "../components/forms/CadastroFormEmpresa"
import HeaderBar from "../components/header"
import MainBody from "../components/body/MainBody"

const cadastro = () =>{

    return(
        <MainBody>
            <HeaderBar current="Cadastre-se"></HeaderBar>
            <CadastroFormEmpresa></CadastroFormEmpresa>
        </MainBody>
    )
}

export default cadastro