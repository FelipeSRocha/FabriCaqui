import mongoose from 'mongoose'

export const connectToMongoDB = async ()=>{
  await mongoose.connect(process.env.DATABASE_URL!)
}
export const closeConnection = async () =>{
  await mongoose.connection.close()
}
