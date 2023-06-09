import { useSpring, animated } from "react-spring"
import { useEffect, useState } from "react"
import { factory } from "../../utils/types/types"
import MainMap, { coordType } from "../Maps/MainMap"

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { Label, Title } from "../Text/TextStandarts"

const LabelBox = ({children}:{children: any}) => (
    <div className="flex flex-row items-center">
        {children}
    </div>
)
const DetailPopup = ({
    externalState,
    factoryDetail,
    setFactoryDetail,
}: {
    externalState: Boolean
    factoryDetail: factory | undefined
    setFactoryDetail: React.Dispatch<React.SetStateAction<factory | undefined>>
}) => {
    const [internState, setInternState] = useState<Boolean>(externalState)
    const [centerMap, setCenterMap] = useState<coordType | undefined>(undefined)
    const animationProps = useSpring({
        opacity: internState ? 1 : 0, // propriedade opacity vai de 0 a 1
        bottom: internState ? 0 : -1000, // propriedade bottom vai de 0 a -1000
        config: { duration: 300, tension: 200, friction: 20 },
    })
    useEffect(() => {
        if (factoryDetail) {
            setCenterMap({
                lat: factoryDetail?.location.coordinates[1],
                lng: factoryDetail?.location.coordinates[0],
            })
        }
    },[factoryDetail])
    const closeElement = () => {
        setInternState(false)
        setFactoryDetail(undefined)
    }

    return factoryDetail ? (
        <div className="z-30 w-full h-full left-0 bottom-0 absolute self-center flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col md:flex-row w-full h-full border-x-[1px] border-purple-main relative">
                <div
                    className={`lg:w-3/5 lg:pl-4 lg:p-4 md:h-full h-1/2 lg:block w-screen left-0 top-0 bg-white relative flex flex-col`}
                >
                    <span
                        className="p-4 bg-white box-border cursor-pointer flex flex-row items-center"
                        onClick={closeElement}
                    >
                        <KeyboardBackspaceIcon fontSize="large" />
                        <h1 className="block text-xl font-medium text-gray-700 pl-4">Voltar</h1>
                    </span>
                    <div className="flex flex-col gap-4">
                        <LabelBox >
                            <Label text={"Empresa: "}></Label>
                            <Title
                                text={factoryDetail.general.factoryName}
                            ></Title>
                        </LabelBox>
                        <LabelBox >
                            <Label text={"Endereço: "}></Label>
                            <Title
                                text={`${factoryDetail.address.logradouro}, ${factoryDetail.address.numero}, ${factoryDetail.address.bairro} - ${factoryDetail.address.localidade}/${factoryDetail.address.uf}`}
                            ></Title>
                        </LabelBox>
                        <LabelBox >
                            <Label text={"Telefone: "}></Label>
                            <Title
                                text={`${factoryDetail.general.phoneContact}`}
                            ></Title>
                        </LabelBox>
                        <LabelBox >
                            <Label text={"Email: "}></Label>
                            <Title
                                text={`${factoryDetail.general.emailContact}`}
                            ></Title>
                        </LabelBox>
                    </div>
                </div>
                <div
                    className={`lg:w-2/5 h-1/2 md:h-full lg:block lg:border-l-4 border-purple-main w-full`}
                >
                    <MainMap
                        list={[factoryDetail]}
                        distance={0}
                        center={centerMap}
                        setFactoryDetail={setFactoryDetail}
                    />
                </div>
            </div>
        </div>
    ) : (
        <></>
    )
}

export default DetailPopup
