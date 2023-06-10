import { ReactNode, useState } from "react"
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"
import CloseIcon from "@mui/icons-material/Close"
import DefaultButton from "../button/DefaultButton"

interface SelectProps {
    options: string[]
    onChange: (value: string) => void
    defaultValue?: string
}

interface FormMultiInput {
    addSubcategory:(inputValue:String)=>void
    removeSubcategory:(inputValue:String)=>void
    subCategories:[String]
}

export const Title = ({ text }: { text: string }) => (
    <h1 className="block text-md md:text-3xl font-medium text-gray-700">{text}</h1>
)

export const Label = ({ text }: { text: string }) => (
    <h1 className="block text-sm md:text-2xl font-light text-gray-700">{text}</h1>
)
export const FormDivider = () => {
    return (
        <div className="px-4 py-4">
            <div className="w-full h-[2px] bg-gray-100"></div>
        </div>
    )
}
export const FormWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full px-4 shadow-gray-400 flex flex-col gap-4">
            {children}
        </div>
    )
}
export const FormHeader = ({ children }: { children: ReactNode }) => {
    return <div className="text-xl pb-2 text-purple-main">{children}</div>
}
export const FormContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col md:flex-row w-full gap-2">{children}</div>
    )
}
export const FormLabel = ({ children }: { children: ReactNode }) => {
    return (
        <h2 className="text-sm w-full text-gray-600 md:w-1/4 m-auto">
            {children}
        </h2>
    )
}
export const FormInput = ({
    onChange,
    value,
}: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string | number
}) => {
    return (
        <input
            className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4"
            onChange={onChange}
            value={value}
        ></input>
    )
}
export const FormText = ({ children }: { children: ReactNode }) => {
    return (
        <p className="text-md w-full border-2 bg-gray-100 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4">
            {children}
        </p>
    )
}
export const FormTextArea = ({
    onChange,
    value,
}: {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    value: string | number
}) => {
    return (
        <textarea
            className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4"
            onChange={onChange}
            value={value}
        ></textarea>
    )
}
export const FormMultiSelect = ({ options, onChange, defaultValue }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const handleOptionClick = (optionValue: string) => {
        setSelectedOption(optionValue)
        setIsOpen(false)
        onChange(optionValue)
    }
    if (!options) {
        return <FormText>Carregando...</FormText>
    }
    return (
        <div className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4 relative">
            <div onClick={() => setIsOpen(!isOpen)}>
                <ArrowDropDownCircleIcon
                    className={`h-5 w-5 mr-2 ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                />

                <span>{defaultValue}</span>
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`px-3 py-2 text-md font-medium cursor-pointer hover:bg-gray-100 ${
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
export const FormMultiInput = ({addSubcategory, removeSubcategory, subCategories}:FormMultiInput) => {
    const [inputValue, setInputValue] = useState("")
    return (
        <div className="text-md w-full border-2 border-gray-200 rounded-lg p-2 text-gray-600 md:w-3/4 relative">
            <div className="flex items-center flex-wrap">
                {subCategories.map((subcategory,index) => (
                    <div
                        key={index}
                        className="bg-gray-200 p-1 pl-2 pr-2 rounded-md mr-2 flex items-center"
                    >
                        <span className="mr-2">{subcategory}</span>
                        <button
                            onClick={() => removeSubcategory(subcategory)}
                            className="bg-red-500 text-white px-1 py-0.5 rounded-md"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-3 py-1 border-0 rounded-md"
                    placeholder="Digite a subcategoria"
                    style={{ flexGrow: 1 }}
                />

                <div className="px-4 py-2 rounded-md ml-2">
                    <DefaultButton
                        text={"Adicionar"}
                        onClick={()=>{
                            setInputValue("")
                            addSubcategory(inputValue)}}
                        color={"confirm"}
                    ></DefaultButton>
                </div>
            </div>
        </div>
    )
}