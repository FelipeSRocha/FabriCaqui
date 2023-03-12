import FullGrid from "./FullGrid"

const ProfileGrid = ({ factoryByEmail }: any) => {
  return (
    <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full box-border pb-40">
      {factoryByEmail ? (
        factoryByEmail.map((factory: any,index:number) => {
          return <FullGrid factory={factory} key={`factory-${index}`}/>
        })
      ) : (
        <button>test</button>
      )}
    </div>
  )
}

export default ProfileGrid
