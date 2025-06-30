import { ProductModel } from "../models/product"

const createdProduct = async(req, res)=>{
    const {productName, pricePerUnit, minQuantity} = req.body()
    const newProduct = new ProductModel({
        productName,
        pricePerUnit,
        minQuantity
    })
    await newProduct.save()
    res.json(newProduct)
}

const getAllBooks = async (req, res) => {
    try {
        let allBooks = await BookModel.find({});
        res.json(allBooks)

    }
    catch (err) {
        res.status(400).send("מצטערים הייתה בעיה בשליפת הנתונים" + err.massage);
    }
}

export {createdProduct}