import Image from "next/image"
import Link from "next/link"
import { factory } from "../../utils/types/types"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const SquareGrid = ({ factory, key }: {factory:factory, key:number}) => {
  return (
    <div key={key} className="flex items-center justify-center w-full min-w-[220px] max-w-[500px] h-[300px] p-4 border-purple-main border-[1px] cursor-pointer" onClick={()=>console.log(factory)}>
      <div className="flex flex-col md:flex-row w-full h-full gap-4">
        {/* TODO
        <div className="w-full h-1/2 md:w-80 md:h-full">
          <div className="w-full h-full min-h-min border-black border-2">
            <div className="h-40">image</div>
          </div>
        </div> */}
        <div className="w-full min-h-fit flex flex-col justify-between">
          <div>
            <div className="text-sm">Empresa:</div>
            <div className="text-lg">{factory.general.factoryName}</div>
          </div>

          <div className="flex w-full flex-col">
            <div className="text-sm">Endereço:</div>

            <div className="text-lg overflow-hidden">
              {factory.address.logradouro}, {factory.address.numero}
            </div>
            <p className="text-lg">
              {factory.address.localidade} - {factory.address.uf}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SquareGrid
