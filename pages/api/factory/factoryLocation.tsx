import {Factory} from "../../../mongoose/model/Factory"
import {connectToMongoDB} from "../../../utils/connectToMongoDB"
import type { NextApiRequest, NextApiResponse } from 'next'

const FactoryLocation = async(req: NextApiRequest, res: NextApiResponse)=>{
    await connectToMongoDB()

    const data = await Factory.find({
        location: {
           $near: {
              $geometry: {
                 type: "Point",
                 coordinates: [-46.647310676640394,-23.537672496021095]
              }, 
              $maxDistance: 10000
           }
        }
     })
    res.status(200).json(data)
}
export default FactoryLocation