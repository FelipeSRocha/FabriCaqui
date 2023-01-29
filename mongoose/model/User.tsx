import { ObjectId } from "mongodb";
import mongoose from "mongoose"
import {Factory} from "./Factory"

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName:          {type:String, require:true}, 
    lastName:           {type:String, require:true}, 
    email:              {type:String, require:true, unique: true},
    address:            {type:String, require:true},
    city:               {type:String, require:true},
    state:              {type:String, require:true},
    CEP:                {type:String, require:true},
    password:           {type:String, require:true},
    factoryList:        [{idFactory:Number}]
});

export const User = mongoose.models.User || mongoose.model('User', userSchema)
