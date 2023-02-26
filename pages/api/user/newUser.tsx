import {User} from "../../../mongoose/model/User"
import {closeConnection, connectToMongoDB} from "../../../utils/connectToMongoDB"
import type { NextApiRequest, NextApiResponse } from 'next'

const newUser = async(req: NextApiRequest, res: NextApiResponse)=>{
    await connectToMongoDB()
    const payload = req.body
    try{
        const response = await User.create(payload)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.status(400).json("error")
    }
    closeConnection()
}
export default newUser