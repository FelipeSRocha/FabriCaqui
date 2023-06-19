import { useSpring, animated } from "react-spring"
import { useEffect, useState } from "react"
import { factory } from "../../utils/types/types"
import MainMap, { coordType } from "../Maps/MainMap"

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { FormDivider, Label, Title } from "../Text/TextStandarts"
import DefaultButton from "../button/DefaultButton"

const LabelBox = ({ children }: { children: any }) => (
    <div className="grid grid-cols-10 md:grid-cols-6 md:gap-6 gap-1 md:p-4 px-4 md:py-0">
        {children}
    </div>
)
const LabelColumn = ({ children }: { children: any }) => (
    <div className="col-span-2 md:col-span-1 flex items-center">{children}</div>
)
const TextColumn = ({ children }: { children: any }) => (
    <div className="col-span-5 md:col-span-4 flex items-center flex-wrap gap-2">{children}</div>
)
const CopyColumn = ({
    text,
    sendToClip,
    children,
}: {
    text: string
    sendToClip: string
    children: any
}) => (
    <div className={`col-span-3  md:col-span-1`}>
        <DefaultButton
            text={text}
            onClick={() => {
                navigator.clipboard.writeText(sendToClip)
            }}
            color={"confirm"}
        >
            {children}
        </DefaultButton>
    </div>
)
const DetailPopup = ({
    factoryDetail,
    setFactoryDetail,
}: {
    factoryDetail: factory | undefined
    setFactoryDetail: React.Dispatch<React.SetStateAction<factory | undefined>>
}) => {
    const [centerMap, setCenterMap] = useState<coordType | undefined>(undefined)

    useEffect(() => {
        if (factoryDetail) {
            setCenterMap({
                lat: factoryDetail?.location.coordinates[1],
                lng: factoryDetail?.location.coordinates[0],
            })
        }
    }, [factoryDetail])
    const closeElement = () => {
        setFactoryDetail(undefined)
    }

    return factoryDetail ? (
        <div className="z-30 w-full h-full left-0 bottom-0 absolute self-center flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col md:flex-row w-full h-full border-x-[1px] border-purple-main relative">
                <div
                    className={`lg:w-3/5 lg:pl-4 lg:p-4 md:h-full h-1/2 lg:block w-screen left-0 top-0 bg-white relative flex flex-col`}
                >
                    <span
                        className="p-4 bg-white box-border cursor-pointer flex flex-row items-center hover:bg-gray-200"
                        onClick={closeElement}
                    >
                        <KeyboardBackspaceIcon fontSize="large" />
                        <h1 className="block text-xl font-medium text-gray-700 pl-4 ">
                            Voltar
                        </h1>
                    </span>
                    <div className="overflow-auto">
                        <div className="flex flex-col pb-8">
                            <FormDivider />
                            <LabelBox>
                                <LabelColumn>
                                    <Label text={"Empresa: "}></Label>
                                </LabelColumn>
                                <TextColumn>
                                    <Title
                                        text={factoryDetail.general.factoryName}
                                    ></Title>
                                </TextColumn>
                                <CopyColumn
                                    sendToClip={
                                        factoryDetail.general.factoryName
                                    }
                                    text={"Copiar Empresa"}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </CopyColumn>
                            </LabelBox>
                            <FormDivider />
                            <LabelBox>
                                <LabelColumn>
                                    <Label text={"Endereço: "}></Label>
                                </LabelColumn>
                                <TextColumn>
                                    <Title
                                        text={`${factoryDetail.address.logradouro}, ${factoryDetail.address.numero}, ${factoryDetail.address.bairro} - ${factoryDetail.address.localidade}/${factoryDetail.address.uf}`}
                                    ></Title>
                                </TextColumn>
                                <CopyColumn
                                    sendToClip={`${factoryDetail.address.logradouro}, ${factoryDetail.address.numero}, ${factoryDetail.address.bairro} - ${factoryDetail.address.localidade}/${factoryDetail.address.uf}`}
                                    text={"Copiar Endereço"}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </CopyColumn>
                            </LabelBox>
                            <FormDivider />
                            <LabelBox>
                                <LabelColumn>
                                    <Label text={"Telefone: "}></Label>
                                </LabelColumn>
                                <TextColumn>
                                    <Title
                                        text={`${factoryDetail.general.phoneContact}`}
                                    ></Title>
                                </TextColumn>
                                <CopyColumn
                                    sendToClip={`${factoryDetail.general.phoneContact}`}
                                    text={"Copiar Número"}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </CopyColumn>
                            </LabelBox>
                            <FormDivider />
                            <LabelBox>
                                <LabelColumn>
                                    <Label text={"Email: "}></Label>
                                </LabelColumn>
                                <TextColumn>
                                    <Title
                                        text={`${factoryDetail.general.emailContact}`}
                                    ></Title>
                                </TextColumn>
                                <CopyColumn
                                    sendToClip={`${factoryDetail.general.emailContact}`}
                                    text={"Copiar Email"}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </CopyColumn>
                            </LabelBox>
                            <FormDivider />
                            <LabelBox>
                                <LabelColumn>
                                    <Label text={"Categoria"}></Label>
                                </LabelColumn>
                                <TextColumn>
                                    <Title
                                        text={`${factoryDetail.category}`}
                                    ></Title>
                                </TextColumn>
                            </LabelBox>
                            <FormDivider />
                            <LabelBox>
                                <LabelColumn>
                                    <Label text={"SubCategoria"}></Label>
                                </LabelColumn>
                                <TextColumn>
                                    {factoryDetail.subCategories.map(
                                        (subcategory, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-200 py-1 px-2 rounded-md mr-2 flex items-center"
                                            >
                                                <Title
                                                    text={`${subcategory}`}
                                                ></Title>
                                            </div>
                                        )
                                    )}
                                </TextColumn>
                            </LabelBox>
                        </div>
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
