import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from "../../../mongoose/model/User"
import {closeConnection, connectToMongoDB} from "../../../utils/connectToMongoDB"

const validateNewFactory = async(req: NextApiRequest, res: NextApiResponse) => {
    await connectToMongoDB()
    const response = await User.find({email: req.query.email})
    if(response.length>0){
        res.status(200).json(false)
    }else{
        res.status(200).json(true)
    }
    closeConnection()
}

export default validateNewFactory