import dotenv from 'dotenv';
import express from 'express';
import connectToDB from "./config/db.js";
import cors from 'cors';
import supplierRouter from './routes/supplier.js'
import orderRouter from './routes/order.js';


dotenv.config();
const app = express();

connectToDB();

app.use(express.json())
app.use(cors());
app.use("/api/suppliers", supplierRouter)
app.use("/api/orders", orderRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server run on port ${PORT}`);
    
})

