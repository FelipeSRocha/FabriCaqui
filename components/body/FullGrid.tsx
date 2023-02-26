import Image from "next/image"
import Link from "next/link"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const FullGrid = ({ factory }: any) => {
  return (
    <div className="flex w-full h-90 rounded-xl relative p-4 shadow-lg sm:rounded-xl border-purple-secondary border-2 ">
      <div className="flex flex-col md:flex-row w-full h-full gap-4">
        <div className="w-full h-1/2 md:w-80 md:h-full">
          <div className="w-full h-full min-h-min border-black border-2">
            {/* <Image></Image> */}
            <div className="h-40">image</div>
          </div>
        </div>
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
        <div className=" bg-purple-main p-4 rounded-xl">
          <Link className={classNames("w-full h-full text-white flex items-center justify-center")} href={`/perfil/f/${factory._id}`}><p>Editar</p></Link>
        </div>
      </div>
    </div>
  )
}

export default FullGrid
