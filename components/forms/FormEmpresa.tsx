import { ChangeEvent, ReactNode, useState, useRef, useEffect } from "react"
import verifyFactoryForm from "../../utils/verifyFactoryForm"
import DefaultButton from "../button/DefaultButton"
import { coordType } from "../Maps/MainMap"
import FormMap from "../Maps/FormMap"
import { factory, session } from "../../utils/types/types"
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"
import RESTAPI from "../../utils/rest"
import { useQuery } from "react-query"
import { isValidCEP } from "../../utils/verifyString"
import { useRouter  } from "next/router"

const cnnpj = "00.000.000/0001-00"

interface orch {
    Gerais: (arg0: string, arg1: string) => void
    address: (arg0: string, arg1: string) => void
    category: (arg1: string) => void
    location: (value: {lat: number, lng: number}) => void
}
interface SelectProps {
    options: string[]
    onChange: (value: string) => void
    defaultValue?: string
}
const FormWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full px-4 shadow-gray-400 flex flex-col gap-4">
            {children}
        </div>
    )
}
const FormHeader = ({ children }: { children: ReactNode }) => {
    return <div className="text-xl pb-2 text-purple-main">{children}</div>
}
const FormContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col md:flex-row w-full gap-2">{children}</div>
    )
}
const FormLabel = ({ children }: { children: ReactNode }) => {
    return (
        <h2 className="text-sm w-full text-gray-600 md:w-1/4 m-auto">
            {children}
        </h2>
    )
}
const FormInput = ({
    onChange,
    value,
}: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string | number
}) => {
    return (
        <input
            className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4"
            onChange={onChange}
            value={value}
        ></input>
    )
}
const FormText = ({ children }: { children: ReactNode }) => {
    return (
        <p className="text-md w-full border-2 bg-gray-100 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4">
            {children}
        </p>
    )
}
const FormDivider = () => {
    return (
        <div className="px-4 py-6">
            <div className="w-full h-[2px] bg-gray-100"></div>
        </div>
    )
}
const FormTextArea = ({
    onChange,
    value,
}: {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    value: string | number
}) => {
    return (
        <textarea
            className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4"
            onChange={onChange}
            value={value}
        ></textarea>
    )
}
const FormMultiSelect = ({ options, onChange, defaultValue }: SelectProps) => {
 

    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string|null>(
        null
    )
    const handleOptionClick = (optionValue: string) => {
        setSelectedOption(optionValue)
        setIsOpen(false)
        onChange(optionValue)
    }
    if (!options) {
        return <FormText>Carregando...</FormText>
    }
    return (
        <div className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4 relative">
            <div onClick={() => setIsOpen(!isOpen)}>
                <ArrowDropDownCircleIcon
                    className={`h-5 w-5 mr-2 ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                />

                <span>
                    {defaultValue}
                </span>
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`px-3 py-2 text-md font-medium cursor-pointer hover:bg-gray-100 ${
                                selectedOption === option ? "bg-gray-100" : ""
                            }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
const FormEmpresa = ({ factory = null, session }: { factory?: factory | null, session:session }) => {
    const router = useRouter()
    const { data: categories } = useQuery("category", () =>
        RESTAPI("category/category")
    )
    const [formData, setFormData] = useState<factory>(() => {
        if (factory === null) {
            return {
                general: {},
                address: {},
                category: {},
                location: {},
                products: {},
                emailUser: session.user.email
            }
        } else {
            return JSON.parse(JSON.stringify(factory))
        }
    })
    const [newChanges, setNewChanges] = useState<Boolean>(false)
    const [addressChanges, setaddressChanges] = useState<Boolean>(false)
    const [cepFilled, setCepFilled] = useState<Boolean>(
        formData.address.cep != undefined
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
        if (verifyFactoryForm(formData)) {
            try {
                console.log(formData)
                const data = await RESTAPI("factory/factory", factory===null?"POST":"PUT", formData)
                if(!data.error && data._id){
                    router.push(`perfil/f/${data._id}`);
                }
            } catch (e) {
                console.log(e)
            }
            return
        }
        alert("Dados preenchidos de forma inválida")
    }
    return (
        <div className={`w-full overflow-scroll border-2 border-transparent`}>
            <div
                className={`max-w-5xl w-full h-fit flex flex-col lg:w-3/4 lg:left-[15%] relative gap-x-4 pb-40 pt-10`}
            >
                {factory != null && (
                    <>
                        {/* Tags  */}
                        <FormWrapper>
                            <FormHeader>Categoria</FormHeader>
                            <FormContainer>
                                <FormLabel>Lista de Categorias:</FormLabel>
                                <FormMultiSelect
                                    options={categories}
                                    onChange={(newValue) =>
                                        orch.category(newValue)
                                    }
                                    defaultValue={formData.category}
                                    // value={formData?.general?.factoryName}
                                ></FormMultiSelect>
                            </FormContainer>
                        </FormWrapper>
                        <FormDivider />

                        {/* Produtos  */}
                        <FormWrapper>
                            <FormHeader>Produtos</FormHeader>
                            <FormContainer>
                                <FormLabel>Lista de Produtos:</FormLabel>
                                <div className="w-full md:w-3/4"></div>
                            </FormContainer>
                        </FormWrapper>
                        <FormDivider />
                    </>
                )}

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
                    <FormContainer>
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
                    </FormContainer>
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
                    <FormContainer>
                        <FormLabel>Imagem:</FormLabel>
                        <input
                            className="text-md w-full border-2 bg-gray-100 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4"
                            type="file"
                            // value={formData.general?.image}
                            onChange={(newValue) =>
                                orch.Gerais("image", newValue.target.value)
                            }
                        ></input>
                    </FormContainer>
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

                    {formData.location.coordinates && (
                        <FormContainer>
                            <div className="w-full h-80 rounded-lg overflow-hidden">
                                <FormMap location={location}></FormMap>
                            </div>
                        </FormContainer>
                    )}
                </FormWrapper>
                <FormDivider />
                <FormWrapper>
                    <DefaultButton
                        text={factory===null? "Cadastrar Empresa!" : "Atualizar Dados"}
                        onClick={handleSave}
                        color={"confirm"}
                    ></DefaultButton>
                </FormWrapper>
            </div>
        </div>
    )
}

export default FormEmpresa
