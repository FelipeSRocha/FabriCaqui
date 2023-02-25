import { ChangeEvent, ReactNode, useState } from "react"
import verifyFactoryForm from "../../utils/verifyFactoryForm"
import DefaultButton from "../button/DefaultButton"
import { coordType } from "../Maps/MainMap"
import FormMap from "../Maps/FormMap"
import { factory } from "../../utils/types/types"

interface orch {
    Gerais: (arg0: string, arg1: string) => void
    address: (arg0: string, arg1: string) => void
    category: (arg0: string, arg1: string) => void
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
const FormMultiSelect = () => {
    return (
        <select multiple className="w-full">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
    )
}
const EditFormEmpresa = ({ factory }: any) => {
    const [formData, setFormData] = useState<factory>(
        JSON.parse(JSON.stringify(factory))
    )
    const [newChanges, setNewChanges] = useState<Boolean>(false)
    const [addressChanges, setaddressChanges] = useState<Boolean>(false)

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
        category: (target, value) => {
            let newFormData = JSON.parse(JSON.stringify(formData))
            newFormData.address[target] = value
            setFormData(newFormData)
            setNewChanges(true)
            setaddressChanges(true)
        },
    }
    const handleSave = (state: (arg0: boolean) => void) => {
        if (verifyFactoryForm(formData)) {
            state(false)
            console.log("salvou")
            return
        }
        alert("Dados preenchidos de forma inválida")
    }
    return (
        <div className={`w-full overflow-scroll border-2 border-transparent`}>
            <div
                className={`max-w-5xl w-full h-fit flex flex-col lg:w-3/4 lg:left-[15%] relative gap-x-4 pb-40 pt-10`}
            >
                {/* Tags  */}
                <FormWrapper>
                    <FormHeader>Categoria</FormHeader>
                    <FormContainer>
                        <FormLabel>Lista de Categorias:</FormLabel>
                        <FormMultiSelect
                            // onChange={(newValue) =>
                            //     orch.Gerais("category", newValue.target.value)
                            // }
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
                        <FormInput
                            value={formData?.general?.description}
                            onChange={(newValue) =>
                                orch.Gerais(
                                    "description",
                                    newValue.target.value
                                )
                            }
                        ></FormInput>
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
                            value={formData.address.cep}
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
                                }
                            }}
                        ></FormInput>
                    </FormContainer>
                    <FormContainer>
                        <FormLabel>Logradouro: </FormLabel>
                        <FormText>{formData.address.logradouro}</FormText>
                    </FormContainer>
                    <FormContainer>
                        <FormLabel>Número:</FormLabel>
                        <FormInput
                            value={formData.address.numero}
                            onChange={(newValue) =>
                                orch.address("numero", newValue.target.value)
                            }
                        ></FormInput>
                    </FormContainer>
                    <FormContainer>
                        <FormLabel>Bairro:</FormLabel>
                        <FormText>{formData.address.bairro}</FormText>
                    </FormContainer>
                    <FormContainer>
                        <FormLabel>Cidade/UF:</FormLabel>
                        <FormText>
                            {formData.address.localidade}/{formData.address.uf}
                        </FormText>
                    </FormContainer>
                    {addressChanges && (
                        <FormContainer>
                            <DefaultButton
                                text={"Salvar e Atualizar Localização"}
                                onClick={() => {
                                    handleSave(setaddressChanges)
                                }}
                                color={"confirm"}
                            />
                        </FormContainer>
                    )}
                    <FormContainer>
                        <div className="w-full h-80 rounded-lg overflow-hidden">
                            <FormMap
                                location={{
                                    lat: formData?.location?.coordinates[1],
                                    lng: formData?.location?.coordinates[0],
                                }}
                            ></FormMap>
                        </div>
                    </FormContainer>
                </FormWrapper>
                <FormDivider />

                {newChanges && (
                    <div className="m-4 w-3/4 md:w-fit">
                        <DefaultButton
                            text={"Salvar Alterações"}
                            onClick={() => {
                                handleSave(setNewChanges)
                            }}
                            color={"confirm"}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditFormEmpresa
