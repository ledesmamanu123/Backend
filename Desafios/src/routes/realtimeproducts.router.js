import { Router } from "express";
import uploader from "../services/uploader.js";
import { Server, Socket } from "socket.io";

import { REQUEST_STATUS } from "../consts.js";
import ProductManager from "../../Managers/ProductManager/productManager.js";
const productManager = new ProductManager();
const router = Router();


router.get('/',async (req, res)=>{
    res.send({status:"Success"})
})

router.post('/',uploader.single("image"),async (req,res)=>{
    const product = req.body;
    const products = await productManager.addProducts(product)
    if(products === REQUEST_STATUS.INCOMPLETE){res.status(400).send({status:"error", error:"Complete los campos"})};
    if(products === REQUEST_STATUS.REJECT){res.status(400).send({status:"error", error:"El codigo ya esta en uso"})};
    res.send({status:"Success"})
})

export default router