import { useState, useEffect } from "react"
import HeaderBar from "../../components/body/header"
import MainBody from "../../components/body/MainBody"
import MainFilter from "../../components/body/MainFilter"
import MapFooter from "../../components/body/MapFooter"
import MainGrid from "../../components/body/MainGrid"
import MainMap, { coordType } from "../../components/Maps/MainMap"
import { useQuery } from "react-query"
import RESTAPI from "../../utils/rest"
import { factory } from "../../utils/types/types"
import { SearchFilter } from "../../components/body/Landing"
import DetailPopup from "../../components/popup/DetailPopup"

export interface Search {
    city: string
    distance: number
    category: null | string
}
export interface orch {
    city: (arg0: string) => void
    category: (arg0: string) => void
    distance: (arg0: string) => void
}
const nullFactory: factory = {
    general: {
        factoryName: "",
        CNPJ: "",
        emailUser: "",
        phoneContact: "",
        description: "",
        emailContact: "",
    },

    address: {
        bairro: "",
        cep: "",
        complemento: "",
        numero: 0,
        ddd: "",
        localidade: "",
        logradouro: "",
        uf: "",
    },
    location: {
        type: "",
        coordinates: [0, 0],
    },
    category: "",
    subCategories:[''],
}
export default function Categorias({
    filters = { city: "São Paulo", category: "", distance: 100 },
}: {
    factories: factory[]
    filters: SearchFilter
    center: coordType
}) {
    const { data, isLoading: isLoadingFactories } = useQuery("factories", () =>
        RESTAPI(
            `factory/findManyByLocation?city=${filters.city}&category=${filters.category}&distance=${filters.distance}`
        )
    )
    const [detailsState, setDetailsState] = useState<Boolean>(false)
    const [detailsValue, setDetailsValue] = useState<factory>(nullFactory)
    const [MobileState, setMobileState] = useState<Boolean>(false)
    const [centerMap, setCenterMap] = useState<coordType>({
        lat: -23.550436616929904,
        lng: -46.63392469525722,
    })
    const [detailCenterMap, setDetailCenterMap] = useState<
        coordType | undefined
    >(undefined)
    const [filterState, setFilterState] = useState<Search>(filters)
    const [factory, setFactory] = useState<factory[]>([])
    const orch: orch = {
        city: (city) => {
            let newSearchState = JSON.parse(JSON.stringify(filterState))
            newSearchState.city = city
            setFilterState(newSearchState)
        },
        category: (category) => {
            let newSearchState = JSON.parse(JSON.stringify(filterState))
            newSearchState.category = category
            setFilterState(newSearchState)
        },
        distance: (distance) => {
            let newSearchState = JSON.parse(JSON.stringify(filterState))
            newSearchState.distance = parseInt(distance)
            setFilterState(newSearchState)
        },
    }
    const handleUpdate = async () => {
        const { factories, center } = await RESTAPI(
            `factory/findManyByLocation?city=${filterState.city}&category=${filterState.category}&distance=${filterState.distance}`
        )
        setFactory(factories)
        setCenterMap(center)
    }
    // const openDetails = (factory: factory) => {
    //     setDetailCenterMap({ lat: factory.location.coordinates[1], lng: factory.location.coordinates[0] })
    //     setDetailsState(true)
    //     setDetailsValue(factory)
    // }
    const closeDetails = () => {
        setDetailCenterMap(undefined)
        setDetailsState(false)
        setDetailsValue(nullFactory)
    }
    useEffect(() => {
        if (data?.factories && data?.center) {
            setFactory(data.factories)
            setCenterMap(data.center)
        }
    }, [data])
    return (
        <MainBody>
            <HeaderBar current="Procurar"></HeaderBar>
            <div className="p-4 border-x-[1px] border-b-[1px] z-20 bg-gray-50 border-purple-main">
                <MainFilter
                    filterState={filterState}
                    orch={orch}
                    handleUpdate={handleUpdate}
                />
            </div>
            <div className="flex flex-row w-full h-full border-x-[1px] border-purple-main relative">
                <div
                    className={`lg:w-3/5 lg:pl-4 lg:block ${
                        MobileState ? "hidden" : "block"
                    } w-screen`}
                >
                    <div className="shadow-xl shadow-gray-400 w-full h-full z-10 bg-gray-50 p-4 relative flex flex-col gap-4">
                        {isLoadingFactories ? (
                            <div>Carregando</div>
                        ) : (
                            <>
                                {/* <DetailPopup
                                    externalState={detailsState}
                                    value={detailsValue}
                                    closeState={closeDetails}
                                /> */}
                                <MainGrid
                                    factories={factory}
                                    // openDetails={openDetails}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div
                    className={`lg:w-2/5 lg:block lg:border-l-4 border-purple-main ${
                        MobileState ? "block" : "hidden"
                    } w-screen`}
                >
                    <MainMap
                        list={factory}
                        distance={filterState.distance}
                        center={centerMap}
                        detailCenterMap={detailCenterMap}
                    />
                </div>
            </div>
            <MapFooter
                MobileState={MobileState}
                invertMobileState={() => setMobileState(!MobileState)}
            />
        </MainBody>
    )
}

export async function getServerSideProps(context: any) {
    const { city = "São Paulo", category = "", distance = 100 } = context.query
    return {
        props: {
            filters: { city, category, distance },
        },
    }
}
