import HeaderBar from "../components/body/header"
import RESTAPI from "../utils/rest"
import { useState } from "react"
import MainBody from "../components/body/MainBody"
import MainMap, { coordType } from "../components/Maps/MainMap"
import MapFooter from "../components/body/MapFooter"
import MainFilter from "../components/body/MainFilter"
import MainGrid from "../components/body/MainGrid"
import { useSession, getSession } from "next-auth/react"
import Landing from "../components/body/Landing"

export default function Home() {

  return (
    <MainBody>
      <HeaderBar current="Início"></HeaderBar>
      <Landing></Landing>
    </MainBody>
  )
}

export async function getServerSideProps(context:any){
  const session = await getSession(context)
  console.log(session)
  return {
    props:{
      session
    }
  }
}
