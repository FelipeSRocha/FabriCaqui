import FullGrid from "./FullGrid"

const ProfileGrid = ({ factoryByEmail }: any) => {
  return (
    <div className="p-4 flex flex-col gap-4 overflow-scroll box-border pb-20">
      {factoryByEmail ? (
        factoryByEmail.map((factory: any) => {
          return <FullGrid factory={factory}/>
        })
      ) : (
        <button>test</button>
      )}
    </div>
  )
}

export default ProfileGrid
