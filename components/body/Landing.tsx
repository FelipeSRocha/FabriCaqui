const Landing = () => {
    return (
        <div className="w-full bg-purple-secondary flex-1 flex items-center justify-center">
            <div className="w-4/5 h-4/5 rounded-xl flex flex-col items-center ">
                <div className="m-20 text-3xl text-white">
                    O lugar para você achar seus fornecedores!
                </div>
                <div className="w-full flex flex-col items-center ">
                    <h1 className="m-10 text-3xl text-white">Procure agora mesmo!</h1>
                    <input
                        className="text-lg w-full border-2 border-gray-200 rounded-full p-2 text-gray-600 md:w-1/2"
                        // onChange={onChange}
                        // value={value}
                    ></input>
                </div>
            </div>
        </div>
    )
}

export default Landing
