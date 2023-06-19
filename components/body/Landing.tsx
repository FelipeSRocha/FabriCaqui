import { ReactNode, useState } from "react"
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"
import { useQuery } from "react-query"
import RESTAPI from "../../utils/rest"
import PlaceIcon from "@mui/icons-material/Place"
import LabelIcon from "@mui/icons-material/Label"
import StraightenIcon from "@mui/icons-material/Straighten"
import DefaultButton from "../button/DefaultButton"
import { useRouter } from "next/router"
import {
    FormDivider,
    Label,
    Title,
    TitleSecondary,
} from "../Text/TextStandarts"

interface SelectProps {
    options: string[]
    onChange: (value: string) => void
    defaultValue?: string | null
    isLoading: boolean
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
export interface SearchFilter {
    city: string
    distance: number
    category: null | string
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
    const router = useRouter()
    const { data: categories = [], isLoading: isLoadingCategories } = useQuery(
        "category",
        () => RESTAPI("category/category")
    )

    const [searchState, setSearchState] = useState<SearchFilter>({
        city: "São Paulo",
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
    const handleSearch = () => {
        router.push({
            pathname: "/procurar",
            query: {
                city: searchState.city,
                category: searchState.category,
                distance: searchState.distance,
            },
        })
    }
    return (
        <div className=" overflow-y-scroll overflow-x-hidden flex-1">
            <div className="w-full bg-purple-secondary py-20">
                <div className="w-full  p-4 h-fit md:p-10 flex flex-col md:w-[500px] bg-white md:left-[15%] relative">
                    <div className="w-full flex flex-col items-center ">
                        <h1 className="mb-4 text-3xl md:text-5xl text-purple-main font-medium">
                            Ache agora seu fornecedor!
                        </h1>
                        <div className="my-2 w-full">
                            <div className="my-2 flex flex-row">
                                <span className="mr-2">
                                    <LabelIcon sx={{ color: "#FFAA00" }} />
                                </span>
                                <FormLabel>Escolha a Categoria</FormLabel>
                            </div>
                            <FormMultiSelect
                                options={categories}
                                isLoading={isLoadingCategories}
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
            </div>
            <div className="w-1/2 h-1/2 bg-white py-20">
                <div className="my-10 md:left-[15%]  relative p-10 pb-20">
                    <h1 className="text-6xl text-purple-main font-bold flex">
                        FabriCaqui
                    </h1>
                    <div className=" py-4">
                        <div className="w-full h-[4px] bg-gray-100"></div>
                    </div>
                    <p className="text-2xl text-gray-800 font-medium flex">
                        Encontre fornecedores locais de confiança no FabriCaqui!
                        Conecte-se diretamente com os melhores fornecedores da
                        sua região, em diversas categorias de produtos e
                        serviços. Simplifique sua busca e faça negócios de forma
                        fácil e segura. Descubra o poder da proximidade no
                        FabriCaqui.
                    </p>
                    <div className=" py-4">
                        <div className="w-full h-[4px]"></div>
                    </div>
                    <h1 className="text-3xl text-purple-main font-bold flex">
                        Sobre o Site
                    </h1>
                    <div className=" py-4">
                        <div className="w-full h-[4px] bg-gray-100"></div>
                    </div>
                    <p className="text-2xl text-gray-800 font-medium flex">
                        Olá! Eu sou Felipe, e estou muito animado em apresentar
                        a você o FabriCaqui, um projeto pessoal que nasceu da
                        minha experiência trabalhando com jardinagem e
                        cosméticos. Durante esse tempo, enfrentei inúmeras
                        dificuldades para encontrar fornecedores confiáveis em
                        outros sites, o que me motivou a criar essa plataforma
                        exclusiva para ajudar a digitalizar e expandir o mercado
                        de fornecedores no Brasil.
                    </p>
                    <div className=" py-4">
                        <div className="w-full h-[4px]"></div>
                    </div>
                    <p className="text-2xl text-gray-800 font-medium flex">
                        Estamos comprometidos em implementar diversas
                        ferramentas inovadoras para tornar sua experiência ainda
                        melhor. Em breve, você poderá desfrutar de recursos como
                        agilização de orçamentos, chat direto com os clientes,
                        pagamentos diretos na plataforma, além de um sistema
                        integrado de organização e acompanhamento de pedidos.
                    </p>
                    <div className=" py-4">
                        <div className="w-full h-[4px]"></div>
                    </div>
                    <p className="text-2xl text-gray-800 font-medium flex">
                        E o melhor de tudo: manteremos o cadastro e a
                        visibilidade nos resultados de pesquisa gratuitos para
                        todos os fornecedores. Acreditamos que a colaboração é a
                        chave para o crescimento mútuo, e queremos incentivar a
                        participação de todos os negócios, independentemente do
                        tamanho ou segmento.
                    </p>
                    <p className="text-2xl text-gray-800 font-medium flex">
                       Caso queira entrar em contato conosco, envie um email para  <a className="pl-2 text-purple-secondary" href="mailto:app.fabricaqui@gmail.com"> app.fabricaqui@gmail.com</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Landing
