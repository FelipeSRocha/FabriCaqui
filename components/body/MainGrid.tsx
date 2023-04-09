import { factory } from "../../utils/types/types"
import SquareGrid from "./SquareGrid"

const MainGrid = ({ 
    factories, 
    // openDetails 
}: { 
    factories: factory[], 
    // openDetails:(factory:factory)=>void 
}) => {
    if (!factories.length) {
        return (<div>Nenhum resultado</div>)
    } else
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 2xl:grid-cols-3 content-start">
                {factories.map((factory, index) => {
                    return (
                        <SquareGrid factory={factory} key={index} ></SquareGrid>
                    )
                })}
            </div>
        )
}

export default MainGrid
