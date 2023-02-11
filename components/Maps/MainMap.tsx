import React from "react"
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api"
import { coordType } from "../forms/CadastroFormEmpresa"
const containerStyle = {
	width: "100%",
	height: "100%"
}
interface props {
	location: coordType
}
const FormMap = ({ location }: props) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
			? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
			: ""
	})
	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={location}
			zoom={15}
		> 
			<MarkerF position={location} />
		</GoogleMap>
	) : (
		<></>
	)
}

export default FormMap
