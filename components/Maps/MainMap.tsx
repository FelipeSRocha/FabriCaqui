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
    list: factory[] | undefined
    distance: number
    center: { lat: number; lng: number } | undefined
    setFactoryDetail: React.Dispatch<React.SetStateAction<factory | undefined>>
}

const FormMap = ({ list = [], distance, center, setFactoryDetail }: props) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            : "",
    })
    const zoom = () => {
        if (distance === 0 ){
            return 15
        }
        if (distance < 10) {
            return 12 // Retorna o valor máximo da primeira categoria se o valor estiver abaixo do limite inferior da segunda categoria
        }
        if (distance > 2000) {
            return 5 // Retorna o valor mínimo da primeira categoria se o valor estiver acima do limite superior da segunda categoria
        }
        const proporcao = Math.min(
            1,
            Math.pow((distance - 10) / (2000 - 10), 1 / 2.5)
        ) // Calcula a proporção inversa do valor dentro da segunda categoria
        return 12 - (12 - 5) * proporcao // Retorna o valor proporcional dentro da primeira categoria
        
    }
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom()}
        >
            {list.map(({ location: { coordinates, type }, general, ...rest }, index) => (
                <MarkerF
                    position={{ lat: coordinates[1], lng: coordinates[0] }}
                    key={`marker-${index}`}
                    onClick={() => setFactoryDetail({...rest, location: {type, coordinates} , general  })}
                    
                    // label={general.factoryName}
                />
            ))}
            {/* <Circle center={center} radius={distance * 1000} key={'map'}/> */}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default FormMap
