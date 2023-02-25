import { Factory } from "../../../mongoose/model/Factory"
import { connectToMongoDB } from "../../../utils/connectToMongoDB"
import type { NextApiRequest, NextApiResponse } from "next"
import { Category } from "../../../mongoose/model/Category"

const category = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('chegou
    ')
    if (req.method === "GET") {
        await connectToMongoDB()
        try {
            const response = await Category.find()
            res.status(200).json(response)
        } catch (e) {
            res.status(400).json(e)
        }
        return
    }
    if (req.method === "POST") {
        await connectToMongoDB()
        try {
            const response = await Category.create({
                name: [
                    "Construção Civil",
                    "Jardinagem",
                    "Cosméticos e Beleza",
                    "Alimentos e Bebidas",
                ],
            })
            res.status(200).json(response)
        } catch (e) {
            res.status(400).json(e)
        }
        return
    }
}
export default category
