import mongoose from "mongoose"
import { ObjectId } from "mongodb";

const { Schema } = mongoose;

const factorySchema = new Schema({
    name: {type:String, require:true},
    CNPJ: {type:String, require:true, unique: true },
    emailUser: {type:String, require:true},
    location: {type:String, require:true},
    tags: [{name:String}],
    products: [{
        name: {type:String,required:true},
        idProduct: {type:ObjectId, require:true},
        productTag: [{name:String}],
    }]
})

export const Factory = mongoose.models.Factory || mongoose.model('Factory', factorySchema)
