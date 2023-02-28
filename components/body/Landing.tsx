import { ReactNode, useState } from "react"
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"
import { useQuery } from "react-query"
import RESTAPI from "../../utils/rest"
import PlaceIcon from "@mui/icons-material/Place"
import LabelIcon from "@mui/icons-material/Label"
import StraightenIcon from "@mui/icons-material/Straighten"
import DefaultButton from "../button/DefaultButton"

interface SelectProps {
    options: string[]
    onChange: (value: string) => void
    defaultValue?: string | null
}
interface orch {
    city: (arg0: string) => void
    category: (arg0: string) => void
    distance: (arg0: string) => void
}
interface RangeProps {
    onChange: (value: string) => void
    defaultValue: number
}
const FormMultiSelect = ({ options, onChange, defaultValue }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const handleOptionClick = (optionValue: string) => {
        setSelectedOption(optionValue)
        setIsOpen(false)
        onChange(optionValue)
    }
    if (!options) {
        return <h1>Carregando...</h1>
    }
    return (
        <div className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-purple-main relative text-xl">
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
    )
}
const FormLabel = ({ children }: { children: ReactNode }) => {
    return (
        <h2 className="text-lg text-purple-main font-medium flex gap-2">
            {children}
        </h2>
    )
}
const Landing = () => {
    const { data: categories } = useQuery("category", () =>
        RESTAPI("category/category")
    )
    const [searchState, setSearchState] = useState({
        city: "",
        distance: 100,
        category: null,
    })

    const orch: orch = {
        city: (city) => {
            let newSearchState = JSON.parse(JSON.stringify(searchState))
            newSearchState.city = city
            setSearchState(newSearchState)
        },
        category: (category) => {
            let newSearchState = JSON.parse(JSON.stringify(searchState))
            newSearchState.category = category
            setSearchState(newSearchState)
        },
        distance: (distance) => {
            let newSearchState = JSON.parse(JSON.stringify(searchState))
            newSearchState.distance = parseInt(distance)
            setSearchState(newSearchState)
        },
    }
    const handleSearch = () =>{
        console.log(searchState)
    }
    return (
        <div className="w-full bg-purple-secondary flex-1 ">
            <div className="w-full mt-10 p-4 h-fit md:p-10 flex flex-col md:w-[500px] bg-white md:left-[15%] relative">
                <div className="w-full flex flex-col items-center ">
                    <h1 className="mb-4 text-3xl md:text-5xl text-purple-main font-medium">
                        Ache agora seu fornecedor!
                    </h1>
                    <div className="my-2 w-full">
                        <div className="my-2 flex flex-row">
                            <span className="mr-2">
                                <LabelIcon sx={{ color: "#FFAA00" }} />
                            </span>
                            <FormLabel>
                                Escolha a Categoria
                            </FormLabel>
                        </div>
                        <FormMultiSelect
                            options={categories}
                            onChange={(newValue) => orch.category(newValue)}
                            defaultValue={searchState.category}
                        />
                    </div>
                    <div className="my-2 w-full">
                        <div className="my-2 flex flex-row">
                            <span className="mr-2">
                                <PlaceIcon sx={{ color: "#FFAA00" }} />
                            </span>
                            <FormLabel>
                                Digite a cidade que deseja procurar
                            </FormLabel>
                        </div>

                        <FormInput
                            value={searchState.city}
                            onChange={(newValue) =>
                                orch.city(newValue.target.value)
                            }
                        ></FormInput>
                    </div>
                    <div className="my-2 w-full">
                        <div className="my-2 flex flex-row">
                            <span className="mr-2">
                                <StraightenIcon sx={{ color: "#FFAA00" }} />
                            </span>
                            <FormLabel>
                                Escolha a Distância:{" "}
                                <div className="font-medium text-xl">
                                    {searchState.distance}
                                </div>
                                km
                            </FormLabel>
                        </div>
                        <FormRange
                            onChange={orch.distance}
                            defaultValue={searchState.distance}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <DefaultButton
                        text={"Procurar!"}
                        color={"confirm"}
                        onClick={handleSearch}
                    ></DefaultButton>
                </div>
            </div>
            {/* <div className="my-10  p-4 text-3xl text-white">
                O lugar para você achar seus fornecedores!
            </div> */}
        </div>
    )
}

export default Landing
