import Image from "next/image"
import { useRouter } from "next/router"

export function MainLogo() {
    const router = useRouter()
    return (
        <div className="h-[45px] w-[90px] relative cursor-pointer" onClick={()=>{router.push('/')}}>
            <Image
                src={`/images/FabricaquiLogo.png`}
                alt={"Fabricaqui Logo"}
                fill
                style={{ objectFit: "scale-down", position: "absolute" }}
                sizes="(max-width: 768px) ,
              (max-width: 1200px)"
                priority={true}
            ></Image>
        </div>
    )
}
