import { Router } from "express";
import CartManager from "../../CartManager/cartManager.js";

//Instancia de la clase Carts
const cartManager = new CartManager();

const router = Router();

//METODO GET
router.get('/', async (req,res)=>{
    const carts = await cartManager.getCarts();
    res.send(carts)
})

export default router