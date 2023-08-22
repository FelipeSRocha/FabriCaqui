import Image from "next/image"
import Link from "next/link"
import { factory } from "../../utils/types/types"
import { Label, Title, TitleSecondary } from "../Text/TextStandarts"

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}

const SquareGrid = ({
    factory,
    key,
    setDetailsValue,
}: {
    factory: factory
    key: number
    setDetailsValue: React.Dispatch<React.SetStateAction<factory | undefined>>
}) => {
    return (
        <div
            key={key}
            className="flex items-center justify-center w-full min-w-[220px] max-w-[500px] h-[200px] p-4 border-purple-main border-[1px] hover:shadow-xl duration-200 rounded-md cursor-pointer overflow-hidden"
            onClick={() => setDetailsValue(factory)}
        >
            <div className="flex flex-col md:flex-row w-full h-full gap-4">
                {/* TODO
        <div className="w-full h-1/2 md:w-80 md:h-full">
          <div className="w-full h-full min-h-min border-black border-2">
            <div className="h-40">image</div>
          </div>
        </div> */}
                <div className="w-full min-h-fit flex flex-col justify-between">
                    <div>
                        <Label text={'Empresa:'}/>
                        <Title text={factory.general.factoryName}/>
                    </div>

                    <div className="flex w-full flex-col">
                        <Label text={'Endereço:'}/>
                        <TitleSecondary text={`${factory.address.logradouro} ${factory.address.numero}`}/>
                        <TitleSecondary text={`${factory.address.localidade} - ${factory.address.uf}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SquareGrid
