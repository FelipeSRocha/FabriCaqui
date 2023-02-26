import mongoose from "mongoose"

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {type:String, require:true}, 
});

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)
