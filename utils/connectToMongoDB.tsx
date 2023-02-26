import mongoose from 'mongoose'

export const connectToMongoDB = async ()=>{
  mongoose.connect(process.env.DATABASE_URL!)
}
export const closeConnection = async () =>{
  mongoose.connection.close()
}
