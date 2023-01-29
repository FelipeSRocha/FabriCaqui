import {MouseEventHandler} from 'react'

interface props {
    label:string, 
    onClick:() => Promise<void>, 
    onloading:boolean
}

export const ConfirmButton = ({label, onClick, onloading = false}: props) =>{

    if(onloading){
        return(
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full cursor-wait">
                <span className="spinner inline-block" role="status">
                <span className="sr-only">Carregando...</span>
                </span>
                Carregando...
            </button>
        )
    }else{
        return(
            <button
                onClick={()=>onClick()}
                className="inline-flex justify-center rounded-md border border-transparent bg-green-main py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-secondary focus:outline-none"
            > 
                <label>
                    {label}
                </label>
            </button>
            )
    }
}   