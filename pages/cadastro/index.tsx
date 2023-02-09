import CadastroFormEmpresa from "../../components/forms/CadastroFormEmpresa"
import HeaderBar from "../../components/header"
import MainBody from "../../components/body/MainBody"
import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from 'react'

const cadastro = () =>{
  const { data: session, status } = useSession()
  const [ loadingPage, setLoadingPage ] = useState<Boolean>(true)
  useEffect(()=>{
    const securePage = () =>{
        if(!session){
            signIn()
        }else{
            setLoadingPage(false)
        }
    }
    securePage()
  },[])

    return(
        <MainBody>
            <HeaderBar current="Cadastre-se"></HeaderBar>
            {loadingPage?
            <div>Carregando...</div>
            :
            <CadastroFormEmpresa></CadastroFormEmpresa>

            }
        </MainBody>
    )
}

export default cadastro