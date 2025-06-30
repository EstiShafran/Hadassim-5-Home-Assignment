import mongoose from "mongoose";

const groceryOwnerSchema = mongoose.Schema({
    fullName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
})

export const GroceryOwnerModel = mongoose.model('GroceryOwner', groceryOwnerSchema)
