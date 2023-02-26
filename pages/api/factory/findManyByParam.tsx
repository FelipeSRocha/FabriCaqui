import {Factory} from "../../../mongoose/model/Factory"
import {closeConnection, connectToMongoDB} from "../../../utils/connectToMongoDB"
import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from "http"

const factoryByParam = async(req: NextApiRequest, res: NextApiResponse)=>{
    if(req.method==="GET"){
        await connectToMongoDB()
        try{
            const response = await Factory.find(req.query)
            console.log(response)
            res.status(200).json(response)
        }catch (e){
            console.log(e)
            res.status(500)
        }
        return
    }
    res.status(400)
    closeConnection()
}
export default factoryByParam