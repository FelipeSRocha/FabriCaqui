import { useState } from "react"

const EditFormEmpresa = ({ factory }: any) => {
  console.log(factory)
  const [tabGerais, setTabGerais] = useState(false)
  const [tabEndereco, setTabEndereco] = useState(false)
  const [tabLocalidade, setTabLocalidade] = useState(false)

  return (
    <>
      <div className="w-full h-full p-2 flex flex-col gap-4 overflow-scroll pb-40">
        <div className="w-full border-2 border-gray-200 p-4 rounded-xl shadow-lg shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">
            Informações Gerais
          </h1>
          <div>
            <h2 className="text-md">Nome da Empresa:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full" value={factory.factoryName}></input>
          </div>
          <div>
            <h2 className="text-md">CNPJ:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full" value={factory.CNPJ}></input>
          </div>
        </div>
        <div className="w-full border-2 border-gray-200 p-4 rounded-xl shadow-lg shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">
            Endereço
          </h1>
          <div>
            <h2 className="text-md">CEP:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full" value={factory.address.cep}></input>
          </div>
          <div>
            <h2 className="text-md">Logradouro: </h2>
            <p className="text-xl border-b-2 border-gray-200 w-full">{factory.address.logradouro}</p>
          </div>
          <div>
            <h2 className="text-md">Número:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full" value={factory.address.numero}></input>
          </div>

          <div>
            <h2 className="text-md">Bairro:</h2>
            <p className="text-xl border-b-2 border-gray-200 w-full">{factory.address.bairro}</p>
          </div>
          <div>
            <h2 className="text-md">Cidade/UF:</h2>
            <p className="text-xl border-b-2 border-gray-200 w-fit">{factory.address.localidade}/{factory.address.uf}</p>
          </div>
        </div>
        <div className="w-full border-2 border-gray-200 p-4 rounded-xl shadow-lg shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">
            Tags
          </h1>
          <div>
            <h2 className="text-md">Lista de Tags:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full" ></input>
          </div>
        </div>
        <div className="w-full border-2 border-gray-200 p-4 rounded-xl shadow-lg shadow-gray-400 flex flex-col gap-4">
          <h1 className="text-xl border-b-2 border-purple-main pb-2">
            Produtos
          </h1>
          <div>
            <h2 className="text-md">Lista de Produtos:</h2>
            <input className="text-xl border-b-2 border-gray-200 w-full" ></input>
          </div>

        </div>
      </div>
    </>
  )
}

export default EditFormEmpresa
