import {Factory} from "../../../mongoose/model/Factory"
import {connectToMongoDB} from "../../../utils/connectToMongoDB"
import type { NextApiRequest, NextApiResponse } from 'next'

const addFactory = async(req: NextApiRequest, res: NextApiResponse)=>{

    if(req.method==="POST"){
        const payload = req.body
        await connectToMongoDB()
        try{
            const response = await Factory.create(payload)
            res.status(200).json(response)
        }catch (e){
            res.status(400).json(e)
        }
        return
    }
    if(req.method==="PUT"){
        const payload = req.body
        await connectToMongoDB()
        try{
            const response = await Factory.updateOne({id:payload._id}, payload)
            res.status(200).json(response)
        }catch (e){
            res.status(400).json(e)
        }
        return
    }
}
export default addFactory