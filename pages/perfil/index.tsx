import CadastroFormPF from "../../components/forms/CadastroFormPF"
import HeaderBar from "../../components/body/header"
import MainBody from "../../components/body/MainBody"
import { useState, useMemo, useEffect } from "react"
import { useSession, getSession } from "next-auth/react"
import MainFilter from "../../components/body/MainFilter"
import MainGrid from "../../components/body/MainGrid"
import MainMap from "../../components/Maps/MainMap"
import { coordType } from "../../components/Maps/MainMap"
import ProfileFactorySearch from "../../components/body/ProfileFactorySearch"
import ProfileGrid from "../../components/body/ProfileGrid"
import MainFooter from "../../components/body/MainFooter"
import RESTAPI from "../../utils/rest"
import { useQuery } from "react-query"

const list: coordType[] = [
  {
    lat: -23.550237,
    lng: -46.633951,
  },
  {
    lat: -23.550337,
    lng: -46.633941,
  },
  {
    lat: -23.550237,
    lng: -46.633911,
  },
  {
    lat: -23.550447,
    lng: -46.6331951,
  },
]

const Perfil = ({ session }: any) => {
  const [MobileState, setMobileState] = useState<Boolean>(false)
  const [data, setData] = useState<null | any>(null)
  const {
    isLoading,
    error,
    data: factoryByEmail,
  } = useQuery("user", () => {
    return RESTAPI(`factory/factoryByParam?email=${session?.user?.email}`)
  })

  const invertMobileState = () => {
    setMobileState(!MobileState)
  }
  return (
    <MainBody>
      <HeaderBar current="Perfil"></HeaderBar>
      <div className="flex flex-row w-full h-full">
        <div
          className={`md:w-4/6 md:pl-4 md:block ${
            MobileState ? "hidden" : "block"
          } w-screen`}
        >
          <div className=" shadow-xl shadow-gray-400 w-full h-full z-10 border-purple-main border-x-2 flex flex-col gap-4">
            {!isLoading && <ProfileGrid factoryByEmail={factoryByEmail} />}
          </div>
        </div>
        {/* <div
          className={`md:w-2/6 md:block ${
            MobileState ? "block" : "hidden"
          } w-screen `}
        >
          <MainMap list={list} />
        </div> */}
      </div>
      {/* <MainFooter
        MobileState={MobileState}
        invertMobileState={invertMobileState}
      /> */}
    </MainBody>
  )
}

export default Perfil

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
