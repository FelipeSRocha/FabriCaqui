import mongoose from "mongoose"

const { Schema } = mongoose;

const categorySchema = new Schema({
    Name: [{type:String, require:true}], 
});

export const Category = mongoose.models.User || mongoose.model('Category', categorySchema)
