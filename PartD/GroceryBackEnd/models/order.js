import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    supplier: {type: mongoose.Schema.Types.ObjectId, ref: "Supplier"},
    items :[{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product' , requierd: true},
        quantity: {type: Number, requierd: true}
    }],
    status:{
        type: String,
        enum: ['Awaiting approval', 'In process', 'Completed'],
        default: 'Awaiting approval'
    },
    createdAt: {type: Date, default: Date.now}
})

export const OrderModel = mongoose.model("orders", orderSchema)