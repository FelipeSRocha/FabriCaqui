import React from "react"

interface Props {
  text: string
  color: "confirm" | "negar" | "informacao"
  isLoading?: boolean
  onClick?: () => void
}

const DefaultButton = ({ text, color, isLoading = false, onClick }: Props) => {
  let backgroundColor = "bg-blue-500"
  let hoverBackgroundColor = "hover:bg-blue-600"

  switch (color) {
    case "confirm":
      backgroundColor = "bg-green-main"
      hoverBackgroundColor = "hover:bg-green-600"
      break
    case "negar":
      backgroundColor = "bg-red-500"
      hoverBackgroundColor = "hover:bg-red-600"
      break
    case "informacao":
      backgroundColor = "bg-orange-main"
      hoverBackgroundColor = "hover:bg-orange-600"
      break
    default:
      break
  }

  if (isLoading) {
    backgroundColor = "bg-gray-400"
    hoverBackgroundColor = "hover:bg-gray-400 cursor-default"
  }

  return (
    <button
      className={`px-4 py-2 rounded-md  text-white z-10 font-semibold transition-colors duration-300 ease-in-out ${backgroundColor} ${hoverBackgroundColor}`}
      disabled={isLoading}
      onClick={onClick}
    >
      <label className=" cursor-pointer">{isLoading ? "Carregando..." : text}</label>
    </button>
  )
}

export default DefaultButton
