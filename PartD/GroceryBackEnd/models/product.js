import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {type: String, required: true},
    pricePerUnit: {type: Number, required: true},
    minQuantity: {type: Number, required: true},
})


export const ProductModel = mongoose.model('Product', productSchema)
