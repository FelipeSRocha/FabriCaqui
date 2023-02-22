import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const { Schema } = mongoose

const factorySchema = new Schema({
  factoryName: { type: String, require: true },
  CNPJ: { type: String, require: true, unique: true },
  emailUser: { type: String, require: true },
  address: {
    bairro: { type: String, require: true },
    cep: { type: String, require: true },
    complemento: { type: String },
    numero: { type: Number, require: true },
    ddd: { type: String, require: true },
    localidade: { type: String, require: true },
    logradouro: { type: String, require: true },
    uf: { type: String, require: true },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  tags: [{ name: String }],
  products: [
    {
      name: { type: String, required: true },
      idProduct: { type: ObjectId, require: true },
      productTag: [{ name: String }],
    },
  ],
})

factorySchema.index({ location: '2dsphere' });

export const Factory =
  mongoose.models.Factory || mongoose.model("Factory", factorySchema)
