import { Factory } from "../../../mongoose/model/Factory"
import {
    closeConnection,
    connectToMongoDB,
} from "../../../utils/connectToMongoDB"
import type { NextApiRequest, NextApiResponse } from "next"

const FactoryLocation = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToMongoDB()
    const { city, category, distance } = req.query
    if (
        Array.isArray(distance) ||
        Array.isArray(category) ||
        Array.isArray(city)
    ) {
        throw new Error(
            "Esperava-se uma string única, mas recebeu uma matriz de strings"
        )
    }
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            `${city} - Brasil`
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    )
    const result = await response.json()
    const { lat, lng } = result.results[0].geometry.location

    let params
    if (category && category !=null) {
        params = {
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat],
                    },
                    $maxDistance: distance ? parseInt(distance) * 1000 : 100000,
                },
            },
            category,
        }
    } else {
        params = {
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat],
                    },
                    $maxDistance: distance ? parseInt(distance) * 1000 : 100000,
                },
            },
        }
    }
    const data = await Factory.find(params)
    res.status(200).json({data, center:{lat, lng}})
    closeConnection()
}
export default FactoryLocation
