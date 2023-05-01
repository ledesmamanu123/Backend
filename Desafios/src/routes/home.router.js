import { Router } from "express";
import ProductManager from "../../Managers/ProductManager/productManager.js";

const productManager = new ProductManager();
const router = Router();

router.get('/',async(req,res)=>{
    try {
        const products = await productManager.getProducts();
        req.io.emit('Products',prod)
        res.send({status:"success", payload: products});
    } catch (error) {
        res.status(500).send({status:"error", error:"Error al obtener productos"});
    }

})
export default router;