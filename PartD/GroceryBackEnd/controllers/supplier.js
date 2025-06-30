import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { ProductModel } from "../models/product.js"
import { SupplierModel } from "../models/supplier.js"
import { GroceryOwnerModel } from "../models/groceryOwner.js"

const registerSupplier = async (req, res) => {
    try {
        const { companyName, phoneNumber, contactName, products, email, password } = req.body

        const existingSupplier = await SupplierModel.findOne({ email });
        const existingOwner = await GroceryOwnerModel.findOne({ email });

        if (existingSupplier || existingOwner) {
            return res.status(400).json({ message: "כבר קיים משתמש עם המייל הזה" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const productsIDs = []
        for (const p of products) {
            const newProduct = new ProductModel({
                productName: p.productName,
                pricePerUnit: p.pricePerUnit,
                minQuantity: p.minQuantity
            })
            const savedProduct = await newProduct.save();
            productsIDs.push(savedProduct._id)
        }

        const newSupplier = new SupplierModel({
            companyName,
            phoneNumber,
            contactName,
            products: productsIDs,
            email,
            password: hashPassword
        })

        await newSupplier.save()

        return res.status(201).json({ message: "המשתמש נשמר" })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const loginSupplier = async (req, res) => {
    try {
        const { email, password } = req.body
        // const supplier = await SupplierModel.findOne({ email })
        let user = await SupplierModel.findOne({ email }).select('+password');
        let role = "supplier";
        let name = null

        if (user) {
            name = user.contactName;
        }
        else {
            user = await GroceryOwnerModel.findOne({ email }).select('+password');
            role = "owner";
            if (user) {
                name = user.fullName;
            }
        }

        if (!user) {
            return res.status(400).json({ message: "משתמש לא נמצא" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log(user.password, password, isMatch)
        console.log("user", user);
        
        if (!isMatch) {
            return res.status(401).json({ message: "סיסמה שגויה" })
        }

        const token = jwt.sign({ id: user._id , role: role}, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.status(200).json({
            message: "ההתחברות הצליחה",
            token,
            role,
            id: user._id,
            name
        })
        console.log(token);
        
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getAllSuppliers = async (req, res) => {
    try {
        let allSuppliers = await SupplierModel.find({})
            .populate('products') // ממלא את שדה המוצרים;
        res.json(allSuppliers)

    }
    catch (err) {
        res.status(400).send("מצטערים הייתה בעיה בשליפת הנתונים" + err.massage);
    }
}

export { registerSupplier, loginSupplier, getAllSuppliers }