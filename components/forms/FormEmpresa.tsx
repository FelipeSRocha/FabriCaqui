import { useState, useEffect } from "react"
import {
    verifyFactoryForm,
    verifyCorrectForm,
} from "../../utils/verifyFactoryForm"
import DefaultButton from "../button/DefaultButton"
import { coordType } from "../Maps/MainMap"
import FormMap from "../Maps/FormMap"
import { factory, session } from "../../utils/types/types"
import RESTAPI from "../../utils/rest"
import { useQuery } from "react-query"
import { isValidCEP } from "../../utils/verifyString"
import { useRouter } from "next/router"

import {
    FormDivider,
    FormWrapper,
    FormHeader,
    FormContainer,
    FormLabel,
    FormInput,
    FormText,
    FormTextArea,
    FormMultiSelect,
    FormMultiInput,
} from "../Text/TextStandarts"
const cnnpj = "00.000.000/0001-00"

interface orch {
    Gerais: (arg0: string, arg1: string) => void
    address: (arg0: string, arg1: string) => void
    category: (arg1: string) => void
    location: (value: { lat: number; lng: number }) => void
    addcategory: (inputValue: String) => void
    removecategory: (inputValue: String) => void
}

const FormEmpresa = ({
    factory = null,
    session,
}: {
    factory?: factory | null
    session: session
}) => {
    const router = useRouter()
    const { data: categories, isLoading: isLoadingCategories } = useQuery(
        "category",
        () => RESTAPI("category/category")
    )
    const [formData, setFormData] = useState<factory>(() => {
        if (factory === null) {
            return {
                general: {},
                address: {},
                category: "Outros",
                subCategories: [],
                location: {},
                // products: {},
                emailUser: session.user.email,
            }
        } else {
            return JSON.parse(JSON.stringify(factory))
        }
    })
    const [filledIn, setfilledIn] = useState<Boolean>(false)
    const [newChanges, setNewChanges] = useState<Boolean>(false)
    const [addressChanges, setaddressChanges] = useState<Boolean>(false)
    const [cepFilled, setCepFilled] = useState<Boolean>(
        formData?.address?.cep != undefined
    )
    const [location, setLocation] = useState<coordType>(
        formData?.location?.coordinates
            ? {
                  lat: formData?.location?.coordinates[1],
                  lng: formData?.location?.coordinates[0],
              }
            : {
                  lat: -23.550237,
                  lng: -46.633951,
              }
    )
    const [deleteState, setDeleteState] = useState<Boolean>(false)
    //this object controls the values that are stored in the form
    const orch: orch = {
        Gerais: (target, value) => {
            let newFormData = JSON.parse(JSON.stringify(formData))
            newFormData.general[target] = value

            setFormData(newFormData)
            setNewChanges(true)
        },
        address: (target, value) => {
            let newFormData = JSON.parse(JSON.stringify(formData))
            newFormData.address[target] = value
            setFormData(newFormData)
            setNewChanges(true)
            setaddressChanges(true)
        },
        category: (value) => {
            let newFormData = JSON.parse(JSON.stringify(formData))
            newFormData.category = value
            setFormData(newFormData)
            setNewChanges(true)
        },
        location: (value) => {
            let newFormData = JSON.parse(JSON.stringify(formData))
            newFormData.location = {
                type: "Point",
                coordinates: [value.lng, value.lat],
            }
            setFormData(newFormData)
            setNewChanges(true)
            setaddressChanges(false)
        },
        addcategory: (inputValue: String) => {
            let newFormData = JSON.parse(JSON.stringify(formData))
            if (inputValue) {
                newFormData.subCategories = [
                    ...newFormData.subCategories,
                    inputValue,
                ]
                setFormData(newFormData)
                setNewChanges(true)
            }
        },
        removecategory: (inputValue: String) => {
            let newFormData = JSON.parse(JSON.stringify(formData))
            if (inputValue) {
                newFormData.subCategories = newFormData.subCategories.filter(
                    (subcategory: String) => subcategory !== inputValue
                )
                setFormData(newFormData)
                setNewChanges(true)
            }
        },
    }
    const handleCepFilled = async () => {
        if (isValidCEP(formData.address.cep)) {
            let CEP: string = formData.address.cep

            CEP = CEP.replace("-", "")
            try {
                const response = await fetch(
                    `https://viacep.com.br/ws/${CEP}/json/`
                )
                const data = await response.json()
                setFormData({
                    ...formData,
                    address: {
                        ...formData.address,
                        bairro: data.bairro,
                        ddd: data.ddd,
                        localidade: data.localidade,
                        logradouro: data.logradouro,
                        uf: data.uf,
                    },
                })
                setCepFilled(true)
            } catch (error) {
                alert("Não foi possível localizar este CEP")
                console.error(error)
                return {}
            }
        } else {
            alert("Preencha o CEP corretamente")
        }
    }
    const handleUpdateMap = async () => {
        if (
            formData.address.logradouro === "" ||
            formData.address.numero === undefined ||
            formData.address.localidade === "" ||
            formData.address.uf === ""
        ) {
            alert("Preencha os campos corretamente")
            return
        }
        const address =
            formData.address.logradouro +
            ", " +
            formData.address.numero +
            " - " +
            formData.address.localidade +
            ", " +
            formData.address.uf

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        )
        const data = await response.json()
        setaddressChanges(false)
        orch.location(data.results[0].geometry.location)
        setLocation(data.results[0].geometry.location)
    }
    const handleSave = async () => {
        if (verifyCorrectForm(formData)) {
            const payload = JSON.parse(JSON.stringify(formData))
            console.log(payload)
            try {
                if (factory === null) {
                    const data = await RESTAPI(
                        "factory/Manager",
                        "POST",
                        payload
                    )
                    if (data._id) {
                        alert("Empresa Cadastrada com Sucesso!")
                        // router.push(`/perfil`)
                        return
                    }
                    alert("Não foi cadastrar sua empresa")
                } else {
                    const data = await RESTAPI(
                        "factory/Manager",
                        "PUT",
                        payload
                    )
                    if (data._id) {
                        setNewChanges(false)
                        alert("Dados Atualizados com sucesso")
                        return
                    }
                    alert("Não foi possível atualizar suas informações")
                }
            } catch (e) {
                console.log(e)
            }
            return
        }
    }
    const handleDelete = async () => {
        if (
            confirm(
                "Você deseja deletar o registro da empresa em nosso site? Essa ação não pode ser desfeita"
            ) == true
        ) {
            const payload = JSON.parse(JSON.stringify(formData))
            const response = await RESTAPI("factory/Manager", "DELETE", payload)
            if (response.deletedCount === 1) {
                router.push("/perfil")
                alert("Registro Deletado")
            }
        }
    }
    useEffect(() => {
        if (verifyFactoryForm(formData)) {
            setfilledIn(true)
        }
    }, [formData])
    return (
        <div className={`w-full overflow-scroll border-2 border-transparent`}>
            <div
                className={`max-w-5xl w-full h-fit flex flex-col lg:w-3/4 lg:left-[15%] relative gap-x-4 pb-40 pt-10`}
            >
                {/* Category  */}
                <FormWrapper>
                    <FormHeader>Categoria</FormHeader>
                    <FormContainer>
                        <FormLabel>Lista de Categorias:</FormLabel>
                        {isLoadingCategories ? (
                            <FormText>Carregando</FormText>
                        ) : (
                            <FormMultiSelect
                                options={categories}
                                onChange={(newValue) => orch.category(newValue)}
                                defaultValue={formData.category}
                                // value={formData?.general?.factoryName}
                            ></FormMultiSelect>
                        )}
                    </FormContainer>
                    <FormContainer>
                        <FormLabel>Subcategoria:</FormLabel>
                        <FormMultiInput
                            addSubcategory={orch.addcategory}
                            removeSubcategory={orch.removecategory}
                            subCategories={formData.subCategories}
                        />
                    </FormContainer>
                </FormWrapper>
                <FormDivider />

                {/* Informações Gerais  */}
                <FormWrapper>
                    <FormHeader>Informações Gerais</FormHeader>
                    <FormContainer>
                        <FormLabel>Nome da Empresa:</FormLabel>
                        <FormInput
                            onChange={(newValue) =>
                                orch.Gerais(
                                    "factoryName",
                                    newValue.target.value
                                )
                            }
                            value={formData?.general?.factoryName}
                        ></FormInput>
                    </FormContainer>
                    {/* <FormContainer>
                        <FormLabel>Descrição da Empresa:</FormLabel>
                        <FormTextArea
                            value={formData?.general?.description}
                            onChange={(newValue) => {
                                if (
                                    newValue.target.value.length < 500 ||
                                    newValue.target.value.length <
                                        formData?.general?.description.length
                                ) {
                                    orch.Gerais(
                                        "description",
                                        newValue.target.value
                                    )
                                }
                            }}
                        ></FormTextArea>
                    </FormContainer> */}
                    <FormContainer>
                        <FormLabel>CNPJ:</FormLabel>
                        <FormInput
                            value={formData?.general?.CNPJ}
                            onChange={(newValue) =>
                                orch.Gerais("CNPJ", newValue.target.value)
                            }
                        ></FormInput>
                    </FormContainer>
                    <FormContainer>
                        <FormLabel>Email de Contato:</FormLabel>
                        <FormInput
                            value={formData?.general?.emailContact}
                            onChange={(newValue) =>
                                orch.Gerais(
                                    "emailContact",
                                    newValue.target.value
                                )
                            }
                        ></FormInput>
                    </FormContainer>
                    <FormContainer>
                        <FormLabel>Telefone de Contato:</FormLabel>
                        <FormInput
                            value={formData?.general?.phoneContact}
                            onChange={(newValue) =>
                                orch.Gerais(
                                    "phoneContact",
                                    newValue.target.value
                                )
                            }
                        ></FormInput>
                    </FormContainer>
                    {/* <FormContainer>
                        <FormLabel>Imagem:</FormLabel>
                        <input
                            className="text-md w-full border-2 bg-gray-100 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4"
                            type="file"
                            // value={formData.general?.image}
                            onChange={(newValue) =>
                                orch.Gerais("image", newValue.target.value)
                            }
                        ></input>
                    </FormContainer> */}
                </FormWrapper>
                <FormDivider />

                {/* Endereço  */}
                <FormWrapper>
                    <FormHeader>Endereço</FormHeader>
                    <FormContainer>
                        <FormLabel>CEP:</FormLabel>
                        <FormInput
                            value={formData?.address?.cep}
                            onChange={(newValue) => {
                                let text = newValue.target.value
                                if (
                                    text.length === 5 &&
                                    formData.address.cep.length === 4
                                ) {
                                    text = text + "-"
                                }
                                if (
                                    text.length < 10 ||
                                    text < formData.address.cep
                                ) {
                                    orch.address("cep", text)
                                    setCepFilled(false)
                                }
                            }}
                        ></FormInput>
                    </FormContainer>
                    {!cepFilled ? (
                        <FormContainer>
                            <DefaultButton
                                text={"Preencher Endereço"}
                                onClick={handleCepFilled}
                                color={"confirm"}
                            />
                        </FormContainer>
                    ) : (
                        <>
                            <FormContainer>
                                <FormLabel>Logradouro: </FormLabel>
                                <FormText>
                                    {formData?.address?.logradouro}
                                </FormText>
                            </FormContainer>
                            <FormContainer>
                                <FormLabel>Número:</FormLabel>
                                <FormInput
                                    value={formData?.address?.numero}
                                    onChange={(newValue) =>
                                        orch.address(
                                            "numero",
                                            newValue.target.value
                                        )
                                    }
                                ></FormInput>
                            </FormContainer>
                            <FormContainer>
                                <FormLabel>Bairro:</FormLabel>
                                <FormText>{formData?.address?.bairro}</FormText>
                            </FormContainer>
                            <FormContainer>
                                <FormLabel>Cidade/UF:</FormLabel>
                                <FormText>
                                    {formData?.address?.localidade}/
                                    {formData?.address?.uf}
                                </FormText>
                            </FormContainer>
                            {addressChanges && (
                                <FormContainer>
                                    <DefaultButton
                                        text={"Atualizar Localização"}
                                        onClick={handleUpdateMap}
                                        color={"confirm"}
                                    />
                                </FormContainer>
                            )}
                        </>
                    )}

                    {formData?.location?.coordinates && (
                        <FormContainer>
                            <div className="w-full h-80 rounded-lg overflow-hidden">
                                <FormMap location={location}></FormMap>
                            </div>
                        </FormContainer>
                    )}
                </FormWrapper>
                <FormDivider />
                <div className="flex flex-row gap-4">
                    {factory != null && (
                        <div className="w-1/2">
                            <FormWrapper>
                                <DefaultButton
                                    text={"Deletar Empresa"}
                                    onClick={handleDelete}
                                    color={"negar"}
                                ></DefaultButton>
                            </FormWrapper>
                        </div>
                    )}
                    {newChanges && filledIn && !addressChanges && (
                        <div className="w-1/2">
                            <FormWrapper>
                                <DefaultButton
                                    text={
                                        factory === null
                                            ? "Cadastrar Empresa!"
                                            : "Atualizar Dados"
                                    }
                                    onClick={handleSave}
                                    color={"confirm"}
                                ></DefaultButton>
                            </FormWrapper>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FormEmpresa
