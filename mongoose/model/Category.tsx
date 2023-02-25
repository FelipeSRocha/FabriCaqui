import mongoose from "mongoose"

const { Schema } = mongoose;

const categorySchema = new Schema({
    Name: {type:String, require:true, unique: true}, 
});

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)
