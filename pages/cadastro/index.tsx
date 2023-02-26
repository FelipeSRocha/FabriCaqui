import HeaderBar from "../../components/body/header"
import MainBody from "../../components/body/MainBody"
import { useSession, signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import FormEmpresa from "../../components/forms/FormEmpresa"
import { useQuery } from "react-query"
import RESTAPI from "../../utils/rest"
import { session } from "../../utils/types/types"

const Cadastro = ({ session }: {session:session}) => {
    return (
        <MainBody>
            <HeaderBar current="Cadastre-se"></HeaderBar>

            <FormEmpresa session={session}></FormEmpresa>
        </MainBody>
    )
}

export default Cadastro

export async function getServerSideProps(context: any) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callback=${process.env.URL}/perfil`,
                permanent: false,
            },
        }
    }
    return {
        props: {
            session,
        },
    }
}
