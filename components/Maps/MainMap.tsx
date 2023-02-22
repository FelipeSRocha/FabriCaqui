
import React from "react"
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api"

export interface coordType {
  lat: number
  lng: number
}
const containerStyle = {
  width: "100%",
  height: "100%",
}

interface props {
  list: coordType[]
}

const FormMap = ({ list }:props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      : "",
  })

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={list[0]} zoom={12}>
      {list.map((loc, index) => (
        <MarkerF position={loc} key={index} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default FormMap
