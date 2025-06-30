import express from "express";
import { registerSupplier, loginSupplier, getAllSuppliers} from "../controllers/supplier.js";

const router = express.Router()

router.post("/", registerSupplier)
router.post("/login", loginSupplier)
router.get("/", getAllSuppliers)

export default router