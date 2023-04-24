import { Router } from "express";
import CartManager from "../../CartManager/cartManager.js";

//Instancia de la clase Carts
const cartManager = new CartManager();

const router = Router();

//METODO POST

router.post('/', async (req,res)=>{
    const newCart = req.body;
    console.log(newCart)
    await cartManager.newCart(newCart)
    res.send({status:"Success", message:"Cart was created successfuly"})
})

//METODO GET
router.get('/', async (req,res)=>{
    const carts = await cartManager.getCarts();
    res.send(carts)
})
router.get('/:cid', async (req,res)=>{
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(parseInt(cartId))
    res.send(cart)
})

export default router