import React from "react"
import {
    GoogleMap,
    useJsApiLoader,
    MarkerF,
    Circle,
} from "@react-google-maps/api"
import { factory } from "../../utils/types/types"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

export interface coordType {
    lat: number
    lng: number
}
const containerStyle = {
    width: "100%",
    height: "100%",
}

interface props {
    list: factory[]
    distance: number
    center: { lat: number; lng: number }
    detailCenterMap: { lat: number; lng: number }|undefined
}

const FormMap = ({ list = [], distance, center, detailCenterMap }: props) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            : "",
    })
    const zoom = () => {
        if (distance < 10) {
            return 12 // Retorna o valor máximo da primeira categoria se o valor estiver abaixo do limite inferior da segunda categoria
        } else if (distance > 2000) {
            return 5 // Retorna o valor mínimo da primeira categoria se o valor estiver acima do limite superior da segunda categoria
        } else {
            const proporcao = Math.min(
                1,
                Math.pow((distance - 10) / (2000 - 10), 1 / 2.5)
            ) // Calcula a proporção inversa do valor dentro da segunda categoria
            return 12 - (12 - 5) * proporcao // Retorna o valor proporcional dentro da primeira categoria
        }
    }
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={detailCenterMap||center}
            zoom={detailCenterMap?15:zoom()}
        >
            {list.map(({ location: { coordinates }, ...rest }, index) => (
                <MarkerF
                    position={{ lat: coordinates[1], lng: coordinates[0] }}
                    key={`marker-${index}`}
                    onClick={() => console.log(rest)}
                />
            ))}
            {/* <Circle center={center} radius={distance * 1000} key={'map'}/> */}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default FormMap
