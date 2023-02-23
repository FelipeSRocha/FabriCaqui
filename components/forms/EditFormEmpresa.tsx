import { ChangeEvent, useState } from "react"
import verifyFactoryForm from "../../utils/verifyFactoryForm"
import DefaultButton from "../button/DefaultButton"

interface orch {
  Gerais: (arg0: string, arg1: string) => void
  address: (arg0: string, arg1: string) => void
}

const EditFormEmpresa = ({ factory }: any) => {
  const [formData, setFormData] = useState<typeof factory>(factory)
  const [newChanges, setNewChanges] = useState<Boolean>(false)


  const orch: orch = {
    Gerais: (target, value) => {
      let newFormData = JSON.parse(JSON.stringify(formData))
      newFormData = { ...newFormData, [target]: value }
      setFormData(newFormData)
      setNewChanges(true)
    },
    address: (target, value) => {
      let newFormData = JSON.parse(JSON.stringify(formData))
      let address = newFormData.address
      address = { ...address, [target]: value }
      setFormData(newFormData)
      setNewChanges(true)
    },
  }
  const handleSave = (state: (arg0: boolean) => void) => {
    if(verifyFactoryForm(formData)){
      state(false)
      console.log("salvou")
      return
    }
    alert('Dados preenchidos de forma inválida')
  }
  return (
    <div className="w-full h-full overflow-scroll ">
      <div className="max-w-5xl w-full h-fit flex flex-col lg:w-3/4 lg:left-[15%] relative gap-x-4 pb-40">
        {/* Informações Gerais  */}
        <div className="w-full border-x-2 border-gray-200 p-4 shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">
            Informações Gerais
          </h1>
          <div>
            <h2 className="text-md">Nome da Empresa:</h2>
            <input
              className="text-xl border-b-2 border-gray-200 w-full"
              onChange={(newValue) =>
                orch.Gerais("factoryName", newValue.target.value)
              }
              value={formData.factoryName}
            ></input>
          </div>
          <div>
            <h2 className="text-md">CNPJ:</h2>
            <input
              className="text-xl border-b-2 border-gray-200 w-full"
              value={formData.CNPJ}
              onChange={(newValue) =>
                orch.Gerais("CNPJ", newValue.target.value)
              }
            ></input>
          </div>

        </div>
        <div className="w-full h-1 bg-purple-secondary" />

        {/* Endereço  */}
        <div className="w-full border-x-2 border-gray-200 p-4 shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">
            Endereço
          </h1>
          <div>
            <h2 className="text-md">CEP:</h2>
            <input
              className="text-xl border-b-2 border-gray-200 w-full"
              value={formData.address.cep}
              onChange={(newValue) =>
                orch.Gerais("cep", newValue.target.value)
              }
            ></input>
          </div>
          <div>
            <h2 className="text-md">Logradouro: </h2>
            <p className="text-xl border-b-2 border-gray-200 w-full">
              {formData.address.logradouro}
            </p>
          </div>
          <div>
            <h2 className="text-md">Número:</h2>
            <input
              className="text-xl border-b-2 border-gray-200 w-full"
              value={formData.address.numero}
              onChange={(newValue) =>
                orch.Gerais("numero", newValue.target.value)
              }
            ></input>
          </div>
          <div>
            <h2 className="text-md">Bairro:</h2>
            <p className="text-xl border-b-2 border-gray-200 w-full">
              {formData.address.bairro}
            </p>
          </div>
          <div>
            <h2 className="text-md">Cidade/UF:</h2>
            <p className="text-xl border-b-2 border-gray-200 w-fit">
              {formData.address.localidade}/{formData.address.uf}
            </p>
          </div>

        </div>
        <div className="w-full h-1 bg-purple-secondary" />

        {/* Tags  */}
        <div className="w-full border-x-2 border-gray-200 p-4 shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">Tags</h1>
          <div>
            <h2 className="text-md">Lista de Tags:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full"></input>
          </div>
        </div>
        <div className="w-full h-1 bg-purple-secondary" />

        {/* Produtos  */}
        <div className="w-full border-x-2 border-gray-200 p-4 shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">
            Produtos
          </h1>
          <div>
            <h2 className="text-md">Lista de Produtos:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full"></input>
          </div>
        </div>
        <div className="w-full h-1 bg-purple-secondary" />
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
