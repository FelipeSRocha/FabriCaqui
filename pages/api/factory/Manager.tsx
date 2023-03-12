import { Factory } from "../../../mongoose/model/Factory"
import {
    closeConnection,
    connectToMongoDB,
} from "../../../utils/connectToMongoDB"
import type { NextApiRequest, NextApiResponse } from "next"

const factoryManager = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const payload = req.body
        await connectToMongoDB()
        try {
            const response = await Factory.create(payload)
            res.status(200).json(response)
        } catch (e) {
            res.status(400).json(e)
        }
        return
    }
    if (req.method === "PUT") {
        const { address, catalog, category, general, location, _id } =
            JSON.parse(JSON.stringify(req.body))
        await connectToMongoDB()
        try {
            const response = await Factory.findByIdAndUpdate(
                _id,
                { $set: { address, catalog, category, general, location } },
                { new: true }
            )
            res.status(200).json(response)
        } catch (e) {
            res.status(400).json(e)
        }
        return
    }
    if (req.method === "DELETE") {
        const { _id } = JSON.parse(JSON.stringify(req.body))
        await connectToMongoDB()
        try {
            const response = await Factory.deleteOne(
                {_id}
            )
            console.log(response)
            res.status(200).json(response)
        } catch (e) {
            res.status(400).json(e)
        }
        return
    }
    // closeConnection()
}
export default factoryManager
