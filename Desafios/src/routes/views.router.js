import { Router } from "express";
import ProductManager from "../../Managers/ProductManager/productManager.js";
const productManager = new ProductManager();
const router = Router();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('home', {products})

})

router.get('/form',(req,res)=>{
    res.render('form')
})

router.get('/realtimeproducts',async (req,res)=>{
    res.render('realTimeProducts')
})

export default router;