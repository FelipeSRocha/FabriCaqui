import HeaderBar from "../components/body/header"
import RESTAPI from "../utils/rest"
import { useState } from "react"
import MainBody from "../components/body/MainBody"
import MainMap, { coordType } from "../components/Maps/MainMap"
import MainFooter from "../components/body/MainFooter"
import MainFilter from "../components/body/MainFilter"
import MainGrid from "../components/body/MainGrid"
import { useSession, getSession } from "next-auth/react"

export default function Home() {
  const session = useSession()
  const [MobileState, setMobileState] = useState<Boolean>(false)
  const [mapContainer, setMapContainer] = useState(null)
  // const onLoad = useCallback((map) => addMarkers(map), []);
  const invertMobileState = () => {
    setMobileState(!MobileState)
  }
  const list:coordType[] =  [
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
  return (
    <MainBody>
      <HeaderBar current="Início"></HeaderBar>
      <div className="flex flex-row w-full h-full">
        <div
          className={`md:w-3/5 md:pl-4 md:block ${
            MobileState ? "hidden" : "block"
          } w-screen`}
        >
          <div className=" shadow-xl shadow-gray-400 w-full h-full z-10 bg-gray-50 p-4 border-purple-main border-x-2 flex flex-col gap-4">
            <MainFilter />
            <MainGrid />
          </div>
        </div>
        <div
          className={`md:w-2/5 md:block ${
            MobileState ? "block" : "hidden"
          } w-screen `}
        >
          <MainMap
            list={list}
          />
        </div>
      </div>
      <MainFooter
        MobileState={MobileState}
        invertMobileState={invertMobileState}
      />
    </MainBody>
  )
}

export async function getServerSideProps(context:any){
  const session = await getSession(context)
  return {
    props:{
      session
    }
  }
}
