import express from "express";
import verifyToken from "../middleware/auth.js";
import { getAllOrders, getOrderBySupplier, updateOrderStatus, creatNewOrder } from "../controllers/order.js";


const router = express.Router()

router.get("/",verifyToken, getAllOrders)
router.get("/supplier",verifyToken , getOrderBySupplier)
router.put("/updateStatus/:id", updateOrderStatus)
router.post("/", creatNewOrder)


export default router
