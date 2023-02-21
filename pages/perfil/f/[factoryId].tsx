import { useRouter } from "next/router"

const editFactory = () => {
    const router = useRouter()
    const { factoryId } = router.query 
    console.log(factoryId)
    return(
        <>
        <div>
            ~test
        </div>
        </>
    )
}

export default editFactory