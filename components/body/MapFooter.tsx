interface props {
    MobileState: Boolean,
    invertMobileState: React.Dispatch<React.SetStateAction<Boolean>>
}

const MapFooter = ({MobileState, invertMobileState}:props) => {
  return (
    <div className="w-full lg:w-4/12 px-4 mx-auto text-center lg:hidden z-20 h-20 flex items-center absolute bottom-0 bg-transparent">
      <div className="w-full text-sm text-blueGray-500 font-semibold py-1 flex justify-around">
        <div
          className="button w-40 h-10 bg-white cursor-pointer select-none
                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#4d0dad67,0_0px_0_0_#4d0dad67]
                    active:border-b-[0px]
                    transition-all duration-150 [box-shadow:0_5px_0_0_#4d0dad67,0_10px_0_0_#4d0dad67]
                    rounded-full  border-[1px] border-purple-main
                    "
        onClick={()=>invertMobileState(true)}
        >
          <span className="flex flex-col justify-center items-center h-full text-purple-main font-bold text-lg ">
            {MobileState?"Mostrar Lista":"Mostrar Mapa"}
          </span>
        </div>

      </div>
    </div>
  )
}
export default MapFooter
