import Image from "next/image"

const FullGrid = ({ factory }: any) => {
  console.log()
  return (
    <div className="flex w-full h-80  rounded-xl relative p-4 shadow-lg sm:rounded-xl border-purple-secondary border-2 ">
      <div className="flex flex-col md:flex-row w-full h-full gap-4">
        <div className="w-full md:w-1/5 h-1/2">
          <div className="w-full h-full min-h-min border-black border-2">
            {/* <Image></Image> */}
            <div className="h-40">image</div>
          </div>
        </div>
        <div className="w-full md:w-4/5 min-h-fit flex flex-col justify-between">
          <div>Empresa:</div>
          <div>{factory.factoryName}</div>
          <div>Endereço:</div>
          <div>{factory.address.logradouro}</div>
          <div className="flex w-full flex-row">
            <p className="">Cidade: </p>
            <p className="mx-2">
              {factory.address.localidade} - {factory.address.uf}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullGrid
