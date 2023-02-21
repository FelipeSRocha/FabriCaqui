import { useRouter } from "next/router"
import { useSession, getSession } from "next-auth/react"
import RESTAPIBACK from "../../../utils/restBack"
import MainBody from "../../../components/body/MainBody"
import HeaderBar from "../../../components/body/header"
import EditFormEmpresa from "../../../components/forms/EditFormEmpresa"

const editFactory = ({ session, factory }: any) => {
  return (
    <MainBody>
      <HeaderBar current="Perfil"></HeaderBar>
      <div className="flex flex-row w-full h-full">
      <EditFormEmpresa factory={factory}/>
      </div>
    </MainBody>
  )
}

export default editFactory

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
  const { factoryId } = context.params
  const factory = await RESTAPIBACK(`factory/factoryByParam?_id=${factoryId}`)

  if (session.user?.email != factory[0].emailUser) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
      factory: factory[0]
    },
  }
}
