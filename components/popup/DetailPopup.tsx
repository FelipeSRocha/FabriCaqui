import { useSpring, animated } from "react-spring"
import { useEffect, useState } from "react"
const DetailPopup = ({
    externalState,
    value,
    closeState,
}: {
    externalState: Boolean
    value: object
    closeState: () => void
}) => {
    const [internState, setInternState] = useState<Boolean>(externalState)
    const animationProps = useSpring({
        opacity: internState ? 1 : 0, // propriedade opacity vai de 0 a 1
        bottom: internState ? 0 : -1000, // propriedade bottom vai de 0 a -1000
        config: { duration: 300, tension: 200, friction: 20 },
    })

    const closeElement = () => {
        setInternState(false)
        closeState()
    }
    useEffect(() => {
        if (externalState) {
            setInternState(externalState)
        }
    }, [externalState])

    return (
        <animated.div
            className=" fixed z-10 w-full lg:w-3/5 h-2/4 left-0 bottom-0 bg-purple-secondary"
            style={animationProps}
        >
            <div
                className="p-4 bg-white h-20 w-20 cursor-pointer"
                onClick={closeElement}
            >
                X
            </div>
            test
        </animated.div>
    )
}

export default DetailPopup
