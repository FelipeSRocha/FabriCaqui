import HeaderBar from "../components/header"
import RESTAPI from "../utils/rest"
import {useState} from 'react'
import MainBody from "../components/body/MainBody"

export default function Home() {

  return (
    <MainBody>
      <HeaderBar current="Início"></HeaderBar>

    </MainBody>
  )
}
