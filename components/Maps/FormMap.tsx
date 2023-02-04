import React from "react"
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api"
import { coordType } from "../forms/CadastroFormEmpresa"
const containerStyle = {
	width: "100%",
	height: "100%"
}
interface props {
	coordinates: coordType
}
const FormMap = ({ coordinates }: props) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
			? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
			: ""
	})
  console.log(coordinates)
	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={coordinates}
			zoom={15}
		> 
			<MarkerF position={coordinates} />
		</GoogleMap>
	) : (
		<></>
	)
}

export default FormMap
