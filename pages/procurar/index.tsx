import { useState } from "react"
import HeaderBar from "../../components/body/header"
import MainBody from "../../components/body/MainBody"
import MainFilter from "../../components/body/MainFilter"
import MapFooter from "../../components/body/MapFooter"
import MainGrid from "../../components/body/MainGrid"
import MainMap, { coordType } from "../../components/Maps/MainMap"
export default function Categorias() {
    const [MobileState, setMobileState] = useState<Boolean>(false)
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
    return (
        <MainBody>
            <HeaderBar current="Procurar"></HeaderBar>
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
                    <MainMap list={list} />
                </div>
            </div>
            <MapFooter
                MobileState={MobileState}
                invertMobileState={() => setMobileState(!MobileState)}
            />
        </MainBody>
    )
}
