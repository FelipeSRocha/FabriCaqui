import { factory } from "../../utils/types/types"
import SquareGrid from "./SquareGrid"

const MainGrid = ({ factories }: { factories: factory[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 2xl:grid-cols-3 content-start">
            {factories.map((factory) => {
                return <SquareGrid factory={factory}>test</SquareGrid>
            })}
            <div></div>
        </div>
    )
}

export default MainGrid
