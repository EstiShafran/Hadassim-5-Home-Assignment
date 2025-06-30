import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
    companyName : {type: String, required: true},
    phoneNumber: {type: String, required: true},
    contactName: {type: String, required: true},
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
})

export const SupplierModel = mongoose.model('Supplier', supplierSchema)