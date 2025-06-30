import { log } from "console";
import { OrderModel } from "../models/order.js";


const getAllOrders = async (req, res) => {
    // res.json({ message: "get all orders" });
    if (!req.user.role=='owner') {
        return res.status(403).json({ message: "אין לך הרשאה לגשת למידע זה" });
    }
    try {
        let allOrders = await OrderModel.find({})
        .populate('supplier') // ממלא את שדה הספק
        .populate('items.product');
        res.json(allOrders);

    }
    catch (err) {
        res.status(400).json({message: "מצטערים הייתה בעיה בשליפת הנתונים" + err.massage});
    }
}


const getOrderBySupplier = async (req , res)=>{
    try {
        const supplierId = req.user.id;
        let orders = await OrderModel.find({ supplier: supplierId })
            .populate('supplier')
            .populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(400).json({ message: "מצטערים הייתה בעיה בשליפת הנתונים" + err.message });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { _id, status } = req.body;

        // Find the order by ID and update its status
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            _id,
            { status: status },
            { new: true }
        )
        // .populate('supplier').populate('items.product');

        if (!updatedOrder) {
            return res.status(404).json({ message: "ההזמנה לא נמצאה" });
        }

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: "מצטערים הייתה בעיה בעדכון ההזמנה" + err.message });
    }
}

const creatNewOrder = async (req, res) => {
    const { supplier, items } = req.body;
    const newOrder = new OrderModel({
        supplier,
        items
    });
    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: "מצטערים הייתה בעיה ביצירת ההזמנה" + err.message });
    }
}

export { getAllOrders , getOrderBySupplier, updateOrderStatus, creatNewOrder };