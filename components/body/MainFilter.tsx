import PlaceIcon from "@mui/icons-material/Place"
import LabelIcon from "@mui/icons-material/Label"
import StraightenIcon from "@mui/icons-material/Straighten"
import DefaultButton from "../button/DefaultButton"
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"
import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { useQuery } from "react-query"
import RESTAPI from "../../utils/rest"
import { useRouter } from "next/router"
import { orch, Search } from "../../pages/procurar"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
interface SelectProps {
    options: string[]
    onChange: (value: string) => void
    defaultValue?: string | null
    isLoading: boolean
}

interface RangeProps {
    onChange: (value: string) => void
    defaultValue: number
}

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <div className="my-2 lg:w-1/3 h-full grid grid-rows-2">{children}</div>
}
const FormMultiSelect = ({
    options,
    onChange,
    defaultValue,
    isLoading,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const handleOptionClick = (optionValue: string) => {
        setSelectedOption(optionValue)
        setIsOpen(false)
        onChange(optionValue)
    }
    if (isLoading || !options.length) {
        return <h1>Carregando...</h1>
    }
    return (
        <div className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-purple-main relative text-xl cursor-pointer">
            <div onClick={() => setIsOpen(!isOpen)}>
                <ArrowDropDownCircleIcon
                    className={`h-5 w-5 mr-2 ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                />

                <span>
                    {defaultValue ? defaultValue : "Selecione uma Categoria"}
                </span>
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`px-3 py-2 text-md text-purple-main text-xl cursor-pointer hover:bg-gray-100 ${
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
const FormInput = ({
    onChange,
    value,
}: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}) => {
    return (
        <input
            className="text-md w-full border-2 border-gray-200 rounded-lg px-4 py-2 text-xl text-purple-main"
            onChange={onChange}
            value={value}
        ></input>
    )
}
const FormRange = ({ onChange, defaultValue }: RangeProps) => {
    return (
        <div className="flex items-center">
            <input
                id="default-range"
                type="range"
                min="10"
                max="2000"
                step="10"
                defaultValue={defaultValue}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-orange-main"
                onChange={(newValue) => onChange(newValue.target.value)}
            ></input>
        </div>
    )
}
const FormLabel = ({ children }: { children: ReactNode }) => {
    return (
        <h2 className="text-lg text-purple-main font-medium flex gap-2">
            {children}
        </h2>
    )
}
const MainFilter = ({
    filterState,
    orch,
    handleUpdate,
}: {
    filterState: Search
    orch: orch
    handleUpdate: () => void
}) => {
    const [filterOpen, setFilterOpen] = useState<Boolean>(false)
    const { data: categories = [], isLoading: isLoadingCategories } = useQuery(
        "category",
        () => RESTAPI("category/category")
    )

    return (
        <div className={`w-full px-4 flex flex-col relative h-fit`}>
            <div className=" w-fit">
                <DefaultButton
                    text={"Filtros"}
                    color={"informacao"}
                    onClick={() => setFilterOpen(!filterOpen)}
                ><FilterAltIcon/></DefaultButton>
            </div>
            <div
                className={`w-full flex-col lg:flex-row gap-4 ${
                    filterOpen ? "flex" : "hidden"
                }`}
            >
                <Wrapper>
                    <div className="my-2 flex flex-row h-1/2 items-center">
                        <span className="mr-2">
                            <LabelIcon sx={{ color: "#FFAA00" }} />
                        </span>
                        <FormLabel>Escolha a Categoria</FormLabel>
                    </div>
                    <FormMultiSelect
                        options={categories}
                        isLoading={isLoadingCategories}
                        onChange={(newValue) => orch.category(newValue)}
                        defaultValue={filterState.category}
                    />
                </Wrapper>
                <Wrapper>
                    <div className="my-2 flex flex-row h-1/2 items-center">
                        <span className="mr-2">
                            <PlaceIcon sx={{ color: "#FFAA00" }} />
                        </span>
                        <FormLabel>
                            Digite a cidade que deseja procurar
                        </FormLabel>
                    </div>

                    <FormInput
                        value={filterState.city}
                        onChange={(newValue) =>
                            orch.city(newValue.target.value)
                        }
                    ></FormInput>
                </Wrapper>
                <Wrapper>
                    <div className="my-2 flex flex-row h-1/2 items-center">
                        <span className="mr-2">
                            <StraightenIcon sx={{ color: "#FFAA00" }} />
                        </span>
                        <FormLabel>
                            Escolha a Distância:{" "}
                            <div className="font-medium text-xl">
                                {filterState.distance}
                            </div>
                            km
                        </FormLabel>
                    </div>
                    <FormRange
                        onChange={orch.distance}
                        defaultValue={filterState.distance}
                    />
                </Wrapper>
                <div className="h-full">
                    <DefaultButton
                        text={"Procurar!"}
                        color={"confirm"}
                        onClick={handleUpdate}
                    ></DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default MainFilter
