

const MainBody = ({children}:any) =>{
    return(
        <div className=" w-screen h-screen overflow-hidden flex flex-col content-between">
            {children}
        </div>
    )
}

export default MainBody